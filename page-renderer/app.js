
const Koa = require("koa");
const render = require("./render.js");

const app = new Koa();

app.use(async (ctx) => {
    try {
        const url = ctx.request.url.substring(1);
        const renderedPage = await render(url);
        ctx.body = renderedPage;
        ctx.set("Cache-Control", "max-age=3600");
    } catch(err) {
        console.error(err);
    }
});

module.exports = app;