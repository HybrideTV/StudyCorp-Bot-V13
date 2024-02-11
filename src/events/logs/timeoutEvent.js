const {
  GuildMember,
  MessageEmbed,
  GuildAuditLogs,
  GuildAuditLogsEntry,
} = require("discord.js");
const BaseEvent = require("../../utils/structures/BaseEvent");
const config = require("../../../configuration.json");

module.exports = class TimeoutEvent extends BaseEvent {
  constructor() {
    super("guildMemberUpdate");
  }

  /**
   *
   * @param {*} client
   * @param {GuildMember} oldMember
   * @param {GuildMember} newMember
   */
  async run(client, oldMember, newMember) {
    if (
      oldMember.isCommunicationDisabled() === false &&
      newMember.isCommunicationDisabled() === true
    ) {
      const fetchedLogs = await newMember.guild.fetchAuditLogs({
        type: "GUILD_MEMBER_UPDATE",
        limit: 1,
      });

      const firstEntry = fetchedLogs.entries.first();

      const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle("Sanction - Mute")
        .setColor(0xffff00)
        .addFields(
          { name: "Par ", value: `${newMember.user.username}`, inline: true  },
          { name: "Cible ", value: `${firstEntry.executor}`, inline: true  },
          { name: "Motif ", value: `${firstEntry.reason}` , inline: true },
          )

      oldMember.guild.channels.cache
        .get(`${config.channel_logs}`)
        .send({ embeds: [embed] });
      newMember.send(
        `🔒 __Tu as été rendu muet pour le motif :__   **${firstEntry.reason}** 🔒\n*Tu ne peux plus parler, intéragir, durant toute la sanction.*`
      );
    }
  }
};
