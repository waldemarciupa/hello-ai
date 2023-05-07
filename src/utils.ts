export const getToken = async (taskName: string) => {
  try {
    const response = await fetch(
      `${process.env.API_AIDEVS}/token/${taskName}`,
      {
        method: 'POST',
        body: JSON.stringify({
          apikey: process.env.API_KEY,
        }),
      }
    );
    const result = await response.json();
    if (response.ok) {
      const { token } = result;
      return token;
    } else {
      throw new Error(result.msg);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getTask = async (token: string) => {
  try {
    const response = await fetch(`${process.env.API_AIDEVS}/task/${token}`);
    const result = await response.json();
    if (response.ok) {
      const { cookie } = result;
      return cookie;
    } else {
      throw new Error(result.msg);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const sendAnswer = async ({
  token,
  cookie,
}: {
  token: string;
  cookie: string;
}) => {
  try {
    const response = await fetch(`${process.env.API_AIDEVS}/answer/${token}`, {
      method: 'POST',
      body: JSON.stringify({
        answer: cookie,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      const { msg } = result;
      return msg;
    } else {
      throw new Error(result.msg);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
