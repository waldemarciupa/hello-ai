export const getToken = async (taskName: string) => {
  console.log("Get Token");
  try {
    const response = await fetch(
      `${process.env.AIDEVS_API_URL}/token/${taskName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apikey: process.env.AIDEVS_API_KEY,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.msg);
    }

    const { token } = result;
    console.log({ token });

    return token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred while getting the token.");
    }
  }
};

export const getTask = async (token: string) => {
  console.log("Get Task");
  try {
    const response = await fetch(`${process.env.AIDEVS_API_URL}/task/${token}`);
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      return result;
    } else {
      throw new Error(result.msg);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const sendAnswer = async ({
  token,
  answer,
}: {
  token: string;
  answer: string | number[];
}) => {
  console.log("Send Answer", answer);
  try {
    const response = await fetch(
      `${process.env.AIDEVS_API_URL}/answer/${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          answer: answer,
        }),
      }
    );
    const result = await response.json();
    console.log("result", result);

    if (response.ok) {
      console.log(result);

      const { msg } = result;
      return msg;
    } else {
      throw new Error(result.msg);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getData = async (slug: string | string[] | undefined) => {
  console.log("getData");
  const response = await fetch(`http://localhost:3000/api/${slug}`);
  console.log(response);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
};

export const openAICompletion = async (
  messages: { role: string; content: string }[]
) => {
  try {
    console.log("Loading opeAICompletion");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // gpt-4
        max_tokens: 256,
        temperature: 0.5,
        messages,
      }),
    };

    const response = await fetch(
      `${process.env.OPENAI_API_URL}/v1/chat/completions`,
      options
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
