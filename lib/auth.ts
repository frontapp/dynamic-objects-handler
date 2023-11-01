import crypto from 'crypto';
import {VercelRequest} from '@vercel/node';

export async function isAuthenticatedFrontRequest(req: VercelRequest): Promise<boolean> {
  // We need to guarantee this environment variable is set
  const FRONT_APP_SECRET = process.env.FRONT_APP_SECRET;
  if (!FRONT_APP_SECRET) {
    throw new Error('FRONT_APP_SECRET is not defined');
  }
  const signature = req.headers['x-front-signature'];
  const timestamp = req.headers['x-front-request-timestamp'];

  if (!signature || !timestamp) {
    return false;
  }

  // Fetch the request body, as this is used to generate the signature.
  // If the request is a GET or DELETE, the body should be cast as undefined.
  const body = req.method === 'GET' || req.method === 'DELETE' ? undefined : req.body;

  const baseString = Buffer.concat([
    Buffer.from(`${timestamp}:`, 'utf8'),
    Buffer.from(`${JSON.stringify(body)}`),
  ]).toString();

  const hmac = crypto.createHmac('sha256', FRONT_APP_SECRET).update(baseString).digest('base64');

  return hmac === signature;
}
