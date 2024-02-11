require("dotenv").config();
const BaseCommand = require("../../utils/structures/BaseCommand");
const BlacklistDatabase = require("../../utils/database/models/blacklist");
const globalDb = require("../../utils/database/models/gblacklist");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = class addblacklist extends BaseCommand {
  constructor() {
    super(
      "blacklist",
      "moderation",
      [],
      true,
      "Blacklist an user",
      "<userId/user>"
    );
  }
  /**
   *
   * @param {Client} client
   * @param {Message} msg
   * @param {Array} args
   */
  async run(client, msg, args) {
    if (!msg.member.roles.cache.has("943923255289462795"))
      msg.channel.send(
        "Vous n'avez pas la permission d'ajouter un blacklist !"
      );
    let bmotif = args.slice(2).join(" ");
    let addId = new BlacklistDatabase({
      pseudo: args[0],
      userid: args[1],
      motif: bmotif,
    });
    let addId2 = new globalDb({
      pseudo: args[0],
      userid: args[1],
      motif: bmotif,
    });
    addId
      .save()
      .catch((err) =>
        console
          .log(err)
          .then(() => msg.channel.send("Ajouté à la base de donnée StudyCorp"))
      );
    addId2
      .save()
      .catch((err) =>
        console
          .log(err)
          .then(() => msg.channel.send("Ajouté à la base de donnée globale"))
      );

    const bembed = new MessageEmbed()
      .setColor("0xff0000")
      .setTitle("Blacklist mise à jour")
      .setDescription(
        `L'utilisateur : ${args[0]} à bien été ajouté à la blacklist par ${msg.author.username}`
      )
      .setThumbnail("https://studycorp.fr/images/logo.png")
      .setTimestamp(new Date());

    msg.channel.send({ embeds: [bembed] });
    return;
  }
};
