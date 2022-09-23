import dotenv from 'dotenv';
import botOperation from './bot/commandOperation';
import { Client, Intents } from 'discord.js';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  await interaction.reply(await botOperation(interaction));
});

client.login(process.env.TOKEN || '');
