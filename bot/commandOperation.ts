import R from 'ramda';
import cards from './cards.json';
import commandMap from '../command';
import {
  MessagePayload,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js';

enum CardType {
  MONSTER = 'monster',
  MAGIC = 'magic',
  TRAP = 'trap',
}

type Card = {
  title: string;
  type: CardType;
  src: string;
};

const monsterCards = R.filter<Card>(
  R.where({
    type: R.equals<CardType>(CardType.MONSTER),
  })
)(cards as Array<Card>);

const magicCards = R.filter<Card>(
  R.where({
    type: R.equals<CardType>(CardType.MAGIC),
  })
)(cards as Array<Card>);

const trapCards = R.filter<Card>(
  R.where({
    type: R.equals<CardType>(CardType.TRAP),
  })
)(cards as Array<Card>);

const botOperation = R.cond<
  CommandInteraction,
  InteractionReplyOptions | MessagePayload | string
>([
  [
    R.where({ commandName: R.equals(commandMap.intro) }),
    R.always('窩4 pyㄐㄐ人，小心被我通py'),
  ],
  [R.where({ commandName: R.equals(commandMap.py) }), R.always('通 py !')],
  [
    R.where({ commandName: R.equals(commandMap.card) }),
    (interaction) => {
      const card = getRandomCard(cards as Array<Card>);
      if (!card) {
        return '沒找到色色圖';
      }

      const message = new MessagePayload(interaction, {
        files: [card.src],
      });
      return message;
    },
  ],
  [
    R.where({ commandName: R.equals(commandMap.monsterCard) }),
    (interaction) => {
      const card = getRandomCard(monsterCards);
      if (!card) {
        return '沒找到色色圖';
      }

      const message = new MessagePayload(interaction, {
        files: [card.src],
      });
      return message;
    },
  ],
  [
    R.where({ commandName: R.equals(commandMap.magicCard) }),
    (interaction) => {
      const card = getRandomCard(magicCards);
      if (!card) {
        return '沒找到色色圖';
      }

      const message = new MessagePayload(interaction, {
        files: [card.src],
      });
      return message;
    },
  ],
  [
    R.where({ commandName: R.equals(commandMap.trapCard) }),
    (interaction) => {
      const card = getRandomCard(trapCards);
      if (!card) {
        return '沒找到色色圖';
      }

      const message = new MessagePayload(interaction, {
        files: [card.src],
      });
      return message;
    },
  ],
  [R.T, R.always('沒有這個指令')],
]);

function getRandomCard(cards: Array<Card>): Card | undefined {
  const rNum = Math.random();
  const cardsLen = cards.length;
  const selectedCard = R.nth(Math.round(cardsLen * rNum))(cards);

  return selectedCard;
}

export default botOperation;
