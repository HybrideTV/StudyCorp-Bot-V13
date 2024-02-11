const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
require("dotenv").config();
const api = require("../../../API.js");

module.exports = class fidelite extends BaseCommand {
  constructor() {
    super("fidelite", "services", [], true);
  }
  /**
   *
   * @param {Client} client
   * @param {Message} msg
   * @param {Array} args
   */
  async run(client, msg, args) {
    let bankAccount = await api.getBank(msg.author.id);

    let fidEmbed = new MessageEmbed()
      .setTitle("Nombre de points de fidélité de : " + msg.author.username)
      .setColor(0x06ffa4)
      .setDescription(`Vous disposez actuellement de ${bankAccount} points.`)

      .setTimestamp(Date.now());

    msg.channel.send({ embeds: [fidEmbed] });
  }
};
