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
    const task = await getTask(token);
    console.log(task);
    const url = task.input;
    const instruction = task.msg;
    const question = task.question;

    const getTaskInput = async () => {
      const options = {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        },
      };
      const response = await fetch(url, options);
      const result = await response.text();
      return result;
    };

    const input = await getTaskInput();
    console.log(input);

    const messages = [
      {
        role: 'user',
        content: `${instruction} ${input} ${question}`,
      },
    ];

    const completion = await openAICompletion(messages);

    const answer = completion.choices[0].message.content;
    console.log(answer);

    const answerResponse = await sendAnswer({ token, answer });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
