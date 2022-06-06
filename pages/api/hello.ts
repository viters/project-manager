// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoClient from '../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await mongoClient).db('projectmanagement');
  const projects = db.collection('projects');

  const items = await projects.find().toArray();

  res.status(200).json(items);
}
