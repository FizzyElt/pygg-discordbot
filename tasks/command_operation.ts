import { Client, CommandInteraction } from 'discord.js';
import * as R from 'ramda';
import { constant, pipe, Task, TaskOption, Option } from '../common';
import { CommandName } from '../slash_command/command';
import { getCommandOptionString } from '../utils';
import getCatImage from '../api/get_cat_image';
import { fetchEmoji } from '../api/emoji_kitchen';

const getOperationByCommand = (client: Client<true>) => {
  const eqCommandName = R.propEq('commandName');

  return R.cond<[CommandInteraction], Task.Task<string>>([
    [eqCommandName(CommandName.intro), constant(Task.of('窩4 pyㄐㄐ人，小心被我通py'))],
    [eqCommandName(CommandName.py), constant(Task.of('通 py !'))],
    [
      eqCommandName(CommandName.pyParty),
      constant(
        Task.of(
          'https://cdn.discordapp.com/attachments/903662488258760707/914521041710248006/KGYJi5c.gif'
        )
      ),
    ],
    [eqCommandName(CommandName.dedicationPy), constant(Task.of('獻出你的 py <(Y)>'))],
    [
      eqCommandName(CommandName.noImage),
      constant(
        Task.of(
          'https://cdn.discordapp.com/attachments/903662488258760707/917419682900889620/027023d73c4a7e0edee6047909e3f57b.gif'
        )
      ),
    ],
    [
      eqCommandName(CommandName.myParty),
      constant(
        Task.of(
          'https://memeprod.ap-south-1.linodeobjects.com/user-gif/f617320247c594d021a00064f359fae5.gif'
        )
      ),
    ],
    [
      eqCommandName(CommandName.helicopter),
      constant(Task.of('https://c.tenor.com/5gP35G0ffgkAAAAC/helicopter-upside-down.gif')),
    ],
    [
      eqCommandName(CommandName.work_overtime),
      constant(
        Task.of(
          'https://cdn.discordapp.com/attachments/815589256071872573/1108041370364563546/unknown-2.png'
        )
      ),
    ],
    [eqCommandName(CommandName.cat), getCatImage],
    [
      eqCommandName(CommandName.emo_jiji),
      (interaction) =>
        pipe(
          Option.Do,
          Option.let('left', () => getCommandOptionString('left')(interaction).trim()),
          Option.let('right', () => getCommandOptionString('right')(interaction).trim()),
          Task.of,
          TaskOption.flatMap(({ left, right }) => fetchEmoji(left, right)),
          TaskOption.getOrElse(() => Task.of('emoji kitchen 找不到組合'))
        ),
    ],
    [R.T, constant(Task.of('沒有這個指令'))],
  ]);
};

const commandOperation = ({
  client,
  interaction,
}: {
  client: Client<true>;
  interaction: CommandInteraction;
}) => {
  return pipe(interaction, getOperationByCommand(client));
};

export default commandOperation;
