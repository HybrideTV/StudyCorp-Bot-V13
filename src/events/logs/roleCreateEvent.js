const { Role, MessageEmbed } = require("discord.js");
const BaseEvent = require("../../utils/structures/BaseEvent");
const config = require("../../../configuration.json");

module.exports = class RoleCreateEvent extends BaseEvent {
  constructor() {
    super("roleCreate");
  }

  /**
   *
   * @param {*} client
   * @param {Role} role
   */
  async run(client, role) {
    const roleAdd = new MessageEmbed()
      .setDescription(`Un nouveau rôle a été créé : ${role.name}`)
      .setTimestamp()
      .setColor("#5233ff");
    role.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [roleAdd] });
  }
};
