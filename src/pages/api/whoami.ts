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
    const getAnswer = async () => {
      const token = await getToken(taskName!);
      const { hint } = await getTask(token);

      console.log(hint);

      const messages = [
        {
          role: "user",
          content: `Who is the person mention in hint ${hint}?, return first and last name and nothing more`,
        },
      ];

      const completion = await openAICompletion(messages);
      const person = completion.choices[0].message.content;

      console.log(person);

      const checkIfGetPersonMessage = [
        {
          role: "user",
          content: `Is ${person} the person mention in hint ${hint}? Answer with "Yes" or "No"`,
        },
      ];

      const completion2 = await openAICompletion(checkIfGetPersonMessage);
      const answer = completion2.choices[0].message.content;

      console.log(answer);
      return { token, answer, person };
    };

    const { answer, token, person } = await getAnswer();

    if (answer === "Yes") {
      const answerResponse = await sendAnswer({ token, answer: person });
      console.log(answerResponse);

      res.status(200).json({ data: answerResponse });
    }
  } catch (error: any) {
    return res.status(500).send({ data: error.message });
  }
}
