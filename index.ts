import dotenv from 'dotenv';
import botOperation from './bot/commandOperation';
import { Client, IntentsBitField } from 'discord.js';

dotenv.config();

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await interaction.deferReply();
  } catch (err) {
    console.log(err);
  }

  const msg = await botOperation(interaction);

  interaction.editReply(msg).catch(console.log);
});

client.login(process.env.TOKEN || '');
