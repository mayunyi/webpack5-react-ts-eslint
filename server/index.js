
import Koa from 'koa';

import serverConfig from './nodeConfig';

const app = new Koa();

const { port } = serverConfig;

app.use((ctx, next) => {
    ctx.body = 'hello world';
    next();
});

app.listen(port, () => {
    console.log(`Koa app started at port ${port}`);
});
