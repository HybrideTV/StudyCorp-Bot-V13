const BaseEvent = require("../../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");
const config = require("../../../configuration.json");

module.exports = class RoleDeleteEvent extends BaseEvent {
  constructor() {
    super("roleDelete");
  }

  async run(client, role) {
    const roleRemove = new MessageEmbed()
      .setDescription(`Un rôle a été supprimé : ${role.name}`)
      .setTimestamp()
      .setColor("#5233ff");
    role.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [roleRemove] });
  }
};
