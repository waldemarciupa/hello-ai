import { getTask, getToken, openAICompletion, sendAnswer } from '@/utils';
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
    const { msg, blog } = await getTask(token);
    console.log(msg, blog);

    const messages = [
      {
        role: 'user',
        content: `${msg} ${blog}, for each outline write only one sentence in polish and nothing more`,
      },
    ];

    const completion = await openAICompletion(messages);
    console.log(completion.choices[0].message);

    const answer = completion.choices[0].message.content
      .replaceAll('\n', '')
      .split('.')
      .slice(0, 4);
    console.log(answer);

    const answerResponse = await sendAnswer({ token, answer });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
