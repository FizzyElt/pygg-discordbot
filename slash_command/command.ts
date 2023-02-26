export enum CommandName {
  intro = 'intro',
  py = 'py',
  pyParty = 'py_party',
  dedicationPy = 'dedication_py',
  noImage = 'no_image',
  helicopter = 'helicopter',
  cat = 'cat',
  ask = 'ask',
}

import { SlashCommandBuilder } from '@discordjs/builders';

export const commands = [
  new SlashCommandBuilder().setName(CommandName.intro).setDescription('就是自我介紹'),
  new SlashCommandBuilder().setName(CommandName.py).setDescription('py'),
  new SlashCommandBuilder().setName(CommandName.noImage).setDescription('沒圖說個雞巴'),
  new SlashCommandBuilder().setName(CommandName.dedicationPy).setDescription('dedication py'),
  new SlashCommandBuilder().setName(CommandName.helicopter).setDescription('直升....機'),
  new SlashCommandBuilder().setName(CommandName.cat).setDescription('貓貓'),
];
