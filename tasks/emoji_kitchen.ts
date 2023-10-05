import { TaskOption, pipe } from '../common';

const createEmojiRequest = (left: string, right: string) => {
  const searchParams = {
    key: process.env.EMOJI_KITCHEN_KEY || '',
    client_key: 'emoji_kitchen_funbox',
    q: `${left}_${right}`,
    collection: 'emoji_kitchen_v6',
    contentfilter: 'high',
  };

  return new Request(
    `https://tenor.googleapis.com/v2/featured?${new URLSearchParams(searchParams).toString()}`
  );
};

export const fetchEmoji = (left: string, right: string): TaskOption.TaskOption<string> => {
  return pipe(
    TaskOption.tryCatch(() =>
      fetch(createEmojiRequest(left, right)).then((response) => response.json())
    ),
    TaskOption.map((data) => data.results.at(0)?.url || '找不到組合')
  );
};
