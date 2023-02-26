import dotenv from 'dotenv';
import { Client, IntentsBitField } from 'discord.js';
import interactionCreate from './listeners/interaction_create';

dotenv.config();

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}`);
});

client.on('interactionCreate', interactionCreate(client));

client.login(process.env.TOKEN || '');
