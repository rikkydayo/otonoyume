import { NextApiResponse } from "next";
import * as line from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESSTOKEN!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!,
};

const client = new line.Client(config);

export default (
  { query: { word } }: { query: { word: string } },
  res: NextApiResponse
) => {
  client
    .broadcast({
      type: "text",
      text: word,
    })
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
  res.status(200).json({ message: `you requested for ${word} ` });
};
