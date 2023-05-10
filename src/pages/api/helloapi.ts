import { getTask, getToken, sendAnswer } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: string;
};

async function processRequest(taskName: string): Promise<string> {
  const token = await getToken(taskName);
  const { cookie } = await getTask(token);
  const answer = await sendAnswer({ token, answer: cookie });
  return answer;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const taskName = req.url?.split('/api/')[1];

  if (!taskName) {
    return res.status(400).json({ data: 'Task name is missing' });
  }

  try {
    const answer = await processRequest(taskName);
    res.status(200).json({ data: answer });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}
