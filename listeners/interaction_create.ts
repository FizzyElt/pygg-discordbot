import { Interaction, CacheType, Client, Awaitable } from 'discord.js';
import commandOperation from '../tasks/command_operation';
import { TaskEither, pipe } from '../common';
import * as R from 'ramda';

function interactionCreate(client: Client<true>) {
  return (interaction: Interaction<CacheType>): Awaitable<void> => {
    if (!interaction.isCommand()) return;

    pipe(
      TaskEither.tryCatch(() => interaction.deferReply(), R.identity),
      TaskEither.flatMap(() => TaskEither.fromTask(commandOperation({ client, interaction }))),
      TaskEither.flatMap((msg) =>
        TaskEither.tryCatch(() => interaction.editReply(msg), R.identity)
      ),
      TaskEither.mapLeft(console.error)
    )();
  };
}

export default interactionCreate;
