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
    const { msg, blog } = await getTask(token);

    const messages = [
      {
        role: "user",
        content: `${msg} ${blog}, for each outline write only one sentence in polish and nothing more than 4 sentences. Do not use these outlines in content`,
      },
    ];

    const completion = await openAICompletion(messages);

    const answer = completion.choices[0].message.content
      .replaceAll("\n", "")
      .split(".")
      .slice(0, 4);

    const answerResponse = await sendAnswer({ token, answer });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
