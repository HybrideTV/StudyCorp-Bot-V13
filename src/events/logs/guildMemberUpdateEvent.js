const { GuildMember, MessageEmbed } = require("discord.js");
const BaseEvent = require("../../utils/structures/BaseEvent");
const config = require("../../../configuration.json");

module.exports = class GuildMemberUpdateEvent extends BaseEvent {
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
    var Changes = {
      addedRole: 1,
      removedRole: 2,
    };
    var change = Changes.unknown;

    var removedRole = "";
    oldMember.roles.cache.forEach((role) => {
      if (!newMember.roles.cache.has(role.id)) {
        change = Changes.removedRole;
        removedRole = role.name;
      }
    });

    var addedRole = "";
    newMember.roles.cache.forEach((role) => {
      if (!oldMember.roles.cache.has(role.id)) {
        change = Changes.addedRole;
        addedRole = role.name;
      }
    });
    var memberUpdate = new MessageEmbed().setColor("#ffbb33");
    switch (change) {
      case Changes.addedRole:
        memberUpdate.setTimestamp()
        memberUpdate.addFields(
          { name: "ID de l'utilisateur", value: `${newMember.user.id}` })
        memberUpdate.setDescription(
          `Le rôle ${addedRole} a été ajouté à **${newMember.user.username}**`
        );
        newMember.guild.channels.cache
          .get(`${config.channel_logs}`)
          .send({ embeds: [memberUpdate] });

        break;
      case Changes.removedRole:
        memberUpdate.setTimestamp()
        memberUpdate.addFields(
          { name: "ID de l'utilisateur", value: `${newMember.user.id}` })
        memberUpdate.setDescription(
          `Le rôle ${removedRole} a été supprimé à **${newMember.user.username}**`
        );
        newMember.guild.channels.cache
          .get(`${config.channel_logs}`)
          .send({ embeds: [memberUpdate] });
        break;
    }
  }
};
