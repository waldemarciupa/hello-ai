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
    const { input, question } = await getTask(token);
    console.log(question);

    const name = question.split(' ').at(-1).split('?')[0];

    console.log(name);

    const nameInput = input.filter((s: string) => s.includes(name))[0];

    console.log(nameInput);

    const prompt = `${nameInput} ${question}`;

    console.log(prompt);

    console.log('Test openai');

    const response = await fetch(
      `${process.env.OPENAI_API_URL}/v1/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt,
        }),
      }
    );
    const result = await response.json();
    const answer = result.choices[0].text;
    console.log(answer);

    const answerResponse = await sendAnswer({ token, answer });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
