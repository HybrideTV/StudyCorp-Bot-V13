const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
require("dotenv").config();
const config = require("../../../configuration.json");

module.exports = class avis extends BaseCommand {
  constructor() {
    super("avis");
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   */
  run(client, message, args) {
    if (!message.member.roles.cache.has(`780078493500964864`))
      return message.channel.send("Vous ne pouvez pas déposer d'avis !");
    let vendeur =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let note = args[1];
    let com = args.slice(2).join(" ");

    var nbEtoilies;
    if (note === "1") {
      nbEtoilies = "⭐";
    } else if (note === "2") {
      nbEtoilies = "⭐⭐";
    } else if (note === "3") {
      nbEtoilies = "⭐⭐⭐";
    } else if (note === "4") {
      nbEtoilies = "⭐⭐⭐⭐";
    } else if (note === "5") {
      nbEtoilies = "⭐⭐⭐⭐⭐";
    } else {
      nbEtoilies = "Note non valide :/";
    }

    const embed = new MessageEmbed()
      .setTitle(`Avis sur ${vendeur.user.username}`)
      .setDescription(`**Commentaires : **${com}`)
      .addFields(
        { name: "NOTE", value: `${nbEtoilies} / 5  `, inline: true },
        {
          name: "Avis déposé par",
          value: `${message.author.username}`,
          inline: true,
        }
      )
      .setColor("RANDOM");
    message.channel.guild.channels.cache
      .get(`${config.channel_avis}`)
      .send({ embeds: [embed] });

    if (message.member.roles.cache.has("780078493500964864")) {
      const logsRemoveAvis = new MessageEmbed()
        .setTitle(
          `La permission de déposer un avis à été retirée à ${message.author.username}`
        )
        .setFooter({ text: `ID du client : ${message.author.id}` })

        .setColor(0xb2ff33);
      message.member.roles.remove("780078493500964864");
      message.guild.channels.cache
        .get(`${config.channel_logs}`)
        .send({ embeds: [logsRemoveAvis] });
    }
  }
};
