import { REST } from '@discordjs/rest';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v10';
import dotenv from 'dotenv';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { commands } from './command';

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
  return TE.tryCatch(
    () =>
      rest.put(Routes.applicationGuildCommands(params.clientId, params.guildId), {
        body: commands.map((command) => command.toJSON()),
      }),
    (err) => err
  );
}

pipe(
  pushCommands({ clientId, guildId, commands }),
  TE.match(
    (err) => console.error('command push fail', err),
    (res) => console.log('command push success', res)
  )
)();
