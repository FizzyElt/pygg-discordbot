import dotenv from 'dotenv';
import { REST } from '@discordjs/rest';

import commandMap from './command';

dotenv.config();

const TOKEN = process.env.TOKEN || '';
const CLIENT_ID = process.env.APP_CLIENT_ID || '';
const GUILD_ID = process.env.GUILD_ID || '';

const commands = [
  {
    name: commandMap.intro,
    description: '就是自我介紹',
  },
  {
    name: commandMap.py,
    description: 'py',
  },
  {
    name: commandMap.pyParty,
    description: 'py party',
  },
  {
    name: commandMap.noImage,
    description: '沒圖說個雞巴',
  },
  { name: commandMap.dedicationPy, description: 'dedication py' },
  {
    name: commandMap.helicopter,
    description: '直升....機',
  },
  {
    name: commandMap.cat,
    description: '貓貓',
  },
  {
    name: commandMap.ask,
    description: '求神問卜',
    options: [
      {
        name: 'question',
        description: '你的問題',
        type: 3,
        require: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    console.log(CLIENT_ID, GUILD_ID);
    await rest.put(`/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`, {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (err) {
    console.log(err);
  }
})();
