import { getTask, getToken, openAICompletion, sendAnswer } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const taskName = req.url?.split("/api/")[1];

  try {
    const token = await getToken(taskName!);
    await getTask(token);

    // Build formData object.
    let formData = new FormData();
    const question = "What is capital of Poland?";
    formData.append("question", question);

    const response = await fetch(
      `${process.env.AIDEVS_API_URL}/task/${token}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    const messages = [
      {
        role: "user",
        content: `Here is question ${question} and answer ${result.answer}}, if answer is correct return "YES" if not return "NO"`,
      },
    ];

    const completion = await openAICompletion(messages);
    const answer = completion.choices[0].message.content;
    const answerResponse = await sendAnswer({ token, answer });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
