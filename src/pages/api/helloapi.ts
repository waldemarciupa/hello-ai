import { getTask, getToken, sendAnswer } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const taskName = req.url?.split('/api/')[1];

  try {
    const token = await getToken(taskName!);
    const { cookie } = await getTask(token);
    const answer = await sendAnswer({ token, answer: cookie });
    res.status(200).json({ data: answer });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
