import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import * as O from 'fp-ts/Option';
import * as String from 'fp-ts/string';
import * as Number from 'fp-ts/number';
import { pipe, constant } from 'fp-ts/function';

export const getCommandOptionOfType =
  (type: ApplicationCommandOptionType, optionName: string) => (interaction: CommandInteraction) =>
    pipe(
      interaction.options.data.find(({ name }) => String.Eq.equals(name, optionName)),
      O.fromNullable,
      O.filter((option) => option.type === type)
    );

export const getCommandOptionString = (optionName: string) => (interaction: CommandInteraction) =>
  pipe(
    interaction,
    getCommandOptionOfType(ApplicationCommandOptionType.String, optionName),
    O.map((option) => option.value),
    O.filter(String.isString),
    O.getOrElse(constant(''))
  );

export const getCommandOptionInteger = (optionName: string) => (interaction: CommandInteraction) =>
  pipe(
    interaction,
    getCommandOptionOfType(ApplicationCommandOptionType.Integer, optionName),
    O.map((option) => option.value),
    O.filter(Number.isNumber),
    O.getOrElse(constant(0))
  );
