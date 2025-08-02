import { Hono } from 'hono';
import { handle } from "hono/vercel";


import accounts from './accounts';

export const runtime = 'edge';
export type AppType = typeof routes;
 
const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ hello: 'Hello, world!' });
});


export const routes = app.route('/accounts', accounts);


export const GET = handle(app);
export const POST = handle(app);

