import {
  getTask,
  getToken,
  openAICompletion,
  openAIEmbedding,
  sendAnswer,
} from "@/utils";
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
    const prompt = "Hawaiian pizza";
    const resultEmbedding = await openAIEmbedding(prompt);
    const embedding = resultEmbedding?.data[0]?.embedding;
    console.log("embedding", embedding);

    const answerResponse = await sendAnswer({ token, answer: embedding });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
