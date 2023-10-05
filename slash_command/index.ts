import dotenv from 'dotenv';
import { pipe, TaskEither } from '../common';
import { commands } from './command';
import { Routes, REST, SlashCommandBuilder } from 'discord.js';

dotenv.config();

const token = process.env.TOKEN || '';
const clientId = process.env.APP_CLIENT_ID || '';
const guildId = process.env.GUILD_ID || '';

const rest = new REST({ version: '10' }).setToken(token);

function pushCommands(params: {
  clientId: string;
  guildId: string;
  commands: Array<Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>>;
}) {
  return TaskEither.tryCatch(
    () =>
      rest.put(Routes.applicationGuildCommands(params.clientId, params.guildId), {
        body: commands.map((command) => command.toJSON()),
      }),
    (err) => err
  );
}

pipe(
  pushCommands({ clientId, guildId, commands }),
  TaskEither.match(
    (err) => console.error('command push fail', err),
    (res) => console.log('command push success', res)
  )
)();
