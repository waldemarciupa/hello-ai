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
    const { msg } = await getTask(token);

    console.log(msg.split(" ").at(-1));

    const file = await fetch(msg.split(" ").at(-1) + "?autodownload=true");
    const blob = await file.blob();
    console.log(blob);

    // Build formData object.
    let formData = new FormData();
    formData.append("file", blob);
    formData.append("model", "whisper-1");
    formData.append("response_format", "text");

    const response = await fetch(
      `${process.env.OPENAI_API_URL}/v1/audio/transcriptions`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      }
    );

    const answer = await response.text();
    console.log(answer);

    const answerResponse = await sendAnswer({ token, answer });
    res.status(200).json({ data: answerResponse });
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
