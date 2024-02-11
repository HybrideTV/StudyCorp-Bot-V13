const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../../utils/structures/BaseEvent");
const config = require("../../../configuration.json");
const moment = require("moment");

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super("guildMemberRemove");
  }

  async run(client, member) {
    var dateFormat = new Date(member.user.createdTimestamp);

    const memberRemove = new MessageEmbed()
      .setTitle("Membre parti")
      .setTimestamp()
      .setDescription(member.user.username)
      .addFields(
        { name: "ID de l'utilisateur", value: `${member.user.id}`, inline: true  },
        { name: "Compte créé le", value: `${dateFormat}`, inline: true  },
    )
      .setColor(0xfe4d00);
    member.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [memberRemove] });
  }
};
