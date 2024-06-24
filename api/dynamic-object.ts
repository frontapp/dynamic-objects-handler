import type {VercelRequest, VercelResponse} from '@vercel/node';

import {isAuthenticatedFrontRequest} from './../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Application Objects only send GET requests
  if (!req.method || req.method !== 'GET') {
    return res.status(405).json({error: 'Method Not Allowed'});
  }

  if (!(await isAuthenticatedFrontRequest(req))) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  // For this example, we'll just fetch a todo from the JSONPlaceholder API.
  // This is where you need to implement retrieving the data from your database or application
  const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${req.query?.id}`);
  const json = await data.json();

  return res.json({
    userId: json.userId,
    id: json.id,
    title: json.title,
    completed: json.completed,
  });
}
