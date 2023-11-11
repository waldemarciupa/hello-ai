import { getTask, getToken, sendAnswer } from "@/utils";
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

    const msg =
      "Opowiedz mi o sobie wykorzystujac placholdery takie jak %imie%, %nazwisko%, %miasto% i %zawod%";

    const answerResponse = await sendAnswer({ token, answer: msg });
    console.log(answerResponse);

    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
