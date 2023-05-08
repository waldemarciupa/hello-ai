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
    const { input } = await getTask(token);
    console.log(input);

    console.log('Test openai');

    const response = await fetch(
      `${process.env.OPENAI_API_URL}/v1/moderations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ input }),
      }
    );
    const { results } = await response.json();
    console.log(results);

    const answer = results.map((result: { flagged: boolean }) =>
      result.flagged ? 1 : 0
    );

    console.log(answer);

    const answerResponse = await sendAnswer({ token, answer });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
