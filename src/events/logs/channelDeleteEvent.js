const BaseEvent = require("../../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");
const config = require("../../../configuration.json");
module.exports = class ChannelDeleteEvent extends BaseEvent {
  constructor() {
    super("channelDelete");
  }

  async run(client, channel) {
    const channelCreate = new MessageEmbed()
    .setTitle("Salon supprimé")
    .setTimestamp()
    .setColor(0x12d1eb)
    .addFields(
      { name: "Nom ", value: `${channel.name}`, inline: true  },
      { name: "ID ", value: `${channel.id}`, inline: true  },
      { name: "Sujet ", value: `${channel.topic}`, inline: true  },
      )
    channel.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [channelCreate] });
  }
};
