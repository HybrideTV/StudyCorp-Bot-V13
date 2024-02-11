const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
require("dotenv").config();
const api = require("../../../API.js");

module.exports = class viewPts extends BaseCommand {
  constructor() {
    super("viewpts", "services", [], true);
  }
  /**
   *
   * @param {Client} client
   * @param {Message} msg
   * @param {Array} args
   */
  async run(client, msg, args) {
    let target = msg.mentions.users.first();
    if (!msg.member.roles.cache.has("1135173965350973450"))
      msg.channel.send("Vous n'avez pas la permission d'ajouter des points !");
    let bankAccount = await api.getBank(target.id);
    if (!target) {
      msg.channel.send(
        "Tu dois mentionner un utilisateur pour voir ses points !"
      );
    }
    let fidEmbed = new MessageEmbed()
      .setTitle("Nombre de points de fidélité de : " + target.username)
      .setColor(0xf71a50)
      .setDescription(
        `Cet utilisateur dispose actuellement de ${bankAccount} points.`
      )
      .setTimestamp(Date.now());

    msg.channel.send({ embeds: [fidEmbed] });
  }
};
