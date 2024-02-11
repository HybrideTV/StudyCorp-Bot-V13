const BaseEvent = require("../../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");
const config = require("../../../configuration.json");
module.exports = class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super("messageDelete");
  }

  async run(client, message) {
    if (message.cleanContent === null && message.cleanContent < 1) return;
    if (message.cleanContent.length > 1024) return;
    const embed = new MessageEmbed()
      .setTitle(`Message supprimé`)
      .setDescription(message.cleanContent)
      .addFields(
        { name: "Par ", value: `${message.author.username}`, inline: true  },
        { name: "Salon ", value: `${message.channel.name}` , inline: true },
        )
      .setColor(0xeb1212)
      .setTimestamp()
    message.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [embed] });
  }
};
