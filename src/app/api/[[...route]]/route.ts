import { Hono } from 'hono';
import { handle } from "hono/vercel";


import accounts from './accounts';
import categories from './categories';

export const runtime = 'edge';
export type AppType = typeof routes;
 
const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ hello: 'Hello, world!' });
});


export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);


export const routes = app
  .route('/accounts', accounts)
  .route('/categories', categories);




