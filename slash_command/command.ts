export enum CommandName {
  intro = 'intro',
  py = 'py',
  pyParty = 'py_party',
  myParty = 'my_party',
  dedicationPy = 'dedication_py',
  noImage = 'no_image',
  helicopter = 'helicopter',
  cat = 'cat',
  ask = 'ask',
  work_overtime = 'work_overtime',
}

import { SlashCommandBuilder } from '@discordjs/builders';

export const commands = [
  new SlashCommandBuilder().setName(CommandName.intro).setDescription('就是自我介紹'),
  new SlashCommandBuilder().setName(CommandName.py).setDescription('py'),
  new SlashCommandBuilder().setName(CommandName.pyParty).setDescription('py party'),
  new SlashCommandBuilder().setName(CommandName.myParty).setDescription('my party'),
  new SlashCommandBuilder().setName(CommandName.noImage).setDescription('沒圖說個雞巴'),
  new SlashCommandBuilder().setName(CommandName.dedicationPy).setDescription('dedication py'),
  new SlashCommandBuilder().setName(CommandName.helicopter).setDescription('直升....機'),
  new SlashCommandBuilder().setName(CommandName.cat).setDescription('貓貓'),
  new SlashCommandBuilder().setName(CommandName.work_overtime).setDescription('無情的加班ㄐ器...'),
];
