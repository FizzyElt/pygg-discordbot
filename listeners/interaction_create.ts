import { Interaction, CacheType, Client, Awaitable } from 'discord.js';
import commandOperation from '../tasks/command_operation';
import * as TaskEither from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import * as R from 'ramda';

function interactionCreate(client: Client<true>) {
  return (interaction: Interaction<CacheType>): Awaitable<void> => {
    if (!interaction.isCommand()) return;

    pipe(
      TaskEither.tryCatch(() => interaction.deferReply(), R.identity),
      TaskEither.chain(() => TaskEither.fromTask(commandOperation({ client, interaction }))),
      TaskEither.chain((msg) => TaskEither.tryCatch(() => interaction.editReply(msg), R.identity)),
      TaskEither.mapLeft(console.error)
    )();
  };
}

export default interactionCreate;
