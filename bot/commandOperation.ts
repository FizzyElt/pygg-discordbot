import axios from 'axios';
import R from 'ramda';
import commandMap from '../command';
import {
  MessagePayload,
  InteractionReplyOptions,
  CommandInteraction,
  ApplicationCommandOptionType,
} from 'discord.js';
import { askOpenAI } from '../openai-api';

const botOperation = R.cond<
  [CommandInteraction],
  | Promise<InteractionReplyOptions | MessagePayload | string>
  | InteractionReplyOptions
  | MessagePayload
  | string
>([
  [R.where({ commandName: R.equals(commandMap.intro) }), R.always('窩4 pyㄐㄐ人，小心被我通py')],
  [R.where({ commandName: R.equals(commandMap.py) }), R.always('通 py !')],
  [
    R.where({
      commandName: R.equals(commandMap.pyParty),
    }),
    R.always(
      'https://cdn.discordapp.com/attachments/903662488258760707/914521041710248006/KGYJi5c.gif'
    ),
  ],
  [
    R.where({
      commandName: R.equals(commandMap.dedicationPy),
    }),
    R.always('獻出你的 py <(Y)>'),
  ],
  [
    R.where({
      commandName: R.equals(commandMap.noImage),
    }),
    R.always(
      'https://cdn.discordapp.com/attachments/903662488258760707/917419682900889620/027023d73c4a7e0edee6047909e3f57b.gif'
    ),
  ],
  [
    R.where({ commandName: R.equals(commandMap.helicopter) }),
    (interaction) => {
      return 'https://c.tenor.com/5gP35G0ffgkAAAAC/helicopter-upside-down.gif';
    },
  ],
  [
    R.where({ commandName: R.equals(commandMap.cat) }),
    async (interaction) => {
      const res = await getCatImage();
      const imageLink = res[0].url || '';
      return imageLink;
    },
  ],
  [
    R.where({ commandName: R.equals(commandMap.ask) }),
    async (interaction) => {
      const question = interaction.options.data.find(({ name }) => name === 'question');
      if (
        question?.type === ApplicationCommandOptionType.String &&
        !R.isNil(question.value) &&
        !R.isEmpty(question.value)
      ) {
        const value = question.value as string;
        try {
          const res = await askOpenAI(value);
          const text = res.data.choices.at(0)?.text || '';
          return value + text;
        } catch (err) {
          return '請重問一遍';
        }
      }

      return '你的問題呢？';
    },
  ],
  [R.T, R.always('沒有這個指令')],
]);

async function getCatImage() {
  const result = await axios.get('https://api.thecatapi.com/v1/images/search', {
    headers: {
      'x-api-key': process.env.CAT_API_KEY || '',
    },
  });

  return result.data;
}

export default botOperation;
