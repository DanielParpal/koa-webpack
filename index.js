import Koa from "koa";
import koaWebpack from "koa-webpack";

const app = new Koa();
const middleware = await koaWebpack();

app.use(middleware);

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(3000);
