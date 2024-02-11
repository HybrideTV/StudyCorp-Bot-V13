const BaseEvent = require("../../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");
const config = require("../../../configuration.json");
module.exports = class ChannelCreateEvent extends BaseEvent {
  constructor() {
    super("channelCreate");
  }

  async run(client, channel) {
    const channelCreate = new MessageEmbed()
      .setTitle("Salon créé")
      .setTimestamp()
      .setColor(0x12d1eb)
      .addFields(
        { name: "Nom ", value: `${channel.name}`, inline: true  },
        { name: "ID ", value: `${channel.id}`, inline: true  },
        { name: "Sujet ", value: `${channel.topic}`, inline: true  },
        )
      .setColor(0xd733ff);
    channel.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [channelCreate] });


      if(channel.parentId === "1054742040795152414"){
        console.log("test")
      }
  }
};
