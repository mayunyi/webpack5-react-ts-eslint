
import Koa from 'koa';

import env from './env';

const app = new Koa();

const { port } = env;

app.use((ctx:Koa.Context, next) => {
    ctx.body = 'hello world';
    next();
});

app.listen(port, () => {
    console.log(`Koa app started at port ${port}`);
});
