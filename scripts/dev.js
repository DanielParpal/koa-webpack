import Koa from "koa";
import webpack from "webpack";
import koaWebpack from "koa-webpack";

(async () => {
  const app = new Koa();
  const publicPath = "http://localhost:3000/dist/";

  const webpackConfig = {
    mode: "development",
    entry: {
      main: ["./src/index.js"],
    },
    output: {
      publicPath,
    },
    module: {
      rules: [
        {
          test: /\.?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
  };

  const compiler = webpack(webpackConfig);

  app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
  });

  const koaMiddleware = await koaWebpack({
    compiler,
    config: webpackConfig,
    devMiddleware: {
      logLevel: "debug",
      publicPath: "http://localhost:3000/dist/",
    },
  });

  app.use(koaMiddleware);

  app.use(async (ctx) => {
    if (ctx.URL.href.endsWith(".js")) return;

    ctx.body = "Hello World";
  });

  app.listen(3000);
})();
