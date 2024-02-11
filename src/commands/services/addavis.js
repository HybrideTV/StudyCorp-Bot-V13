const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed, Message, Client } = require("discord.js");
require("dotenv").config();
const config = require("../../../configuration.json");

module.exports = class avis extends BaseCommand {
  constructor() {
    super("addavis");
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   */
  run(client, message, args) {
    if (!message.member.roles.cache.has(`${config.role_vendeur_certif}`))
      return message.channel.send(
        "Vous n'avez pas le rôle Vendeur Certifié pour autoriser un avis !"
      );
    if (!message.channel.parentID === `${config.category_commande}`)
      return message.channel.send(
        "Cette commande doit être utilisée dans un ticket !"
      );
    let target = message.mentions.members.first();
    let avisrole = message.guild.roles.cache.get("780078493500964864");

    const logsAddAvis = new MessageEmbed()
      .setTitle(
        `La permission de déposer un avis à été ajoutée à ${target.user.username}`
      )
      .setFooter({ text: `ID du client : ${target.id}` })
      .setColor(0xb2ff33);
    const trustpilot = new MessageEmbed()
      .setColor(0x2b6bff)
      .setTitle(
        "Notre serveur te plait ? Fait nous le savoir en laissant un avis sur notre TrustPilot"
      )
      .setDescription("**https://fr.trustpilot.com/evaluate/studycorp.fr**");
    const avis = new MessageEmbed()
      .setTitle(
        `C'est terminé ${target.user.username} ! Tu peux désormais déposer un avis sur ta commande.`
      )
      .setColor(0x2eff2b)
      .setDescription(
        "Tu peux déposer un avis à l'aide de la commande suivante \n \n```+avis <@Votrevendeur> <Note> <Commentaires>``` \n \n Exemple : +avis @HybrideTV 5 Commande d'un bot réalisé rapidement."
      )
      .addFields({
        name: "ATTENTION : La note de l'avis doit être **UN SEUL CHIFFRE DE 1 à 5!**",
        value:
          "*Si l'avis n'est pas correctement déposé, il sera supprimé. Tu as 48H pour le déposer!*",
      });
    message.channel.bulkDelete(1);
    message.channel.send({ embeds: [avis, trustpilot] });
    target.roles.add(avisrole);
    message.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [logsAddAvis] });
    target
      .send(
        `Suite à votre commande sur StudyCorp :\nNous vous rappelons que vous pouvez retrouver le transcript de votre commande depuis l'espace client. \n \n**N'oubliez pas de déposer un avis sur le trustpilot ! Cela ne prends que 1 minute et nous aide énormément :** \n **https://fr.trustpilot.com/evaluate/studycorp.fr**`
      )
      .catch((error) => {
        console.log("Erreur lors de l'envoi du message privé de bannissement");
      });
    setTimeout(() => {
      if (target.roles.cache.has("780078493500964864")) {
        const logsRemoveAvis = new MessageEmbed()
          .setTitle(
            `La permission de déposer un avis à été retirée à ${target.user.user}`
          )
          .setFooter({ text: `ID du client : ${target.id}` })

          .setColor(0xb2ff33);
        target.roles.remove(avisrole);
        message.guild.channels.cache
          .get(`${config.channel_logs}`)
          .send({ embeds: [logsRemoveAvis] });
      }
    }, 172800000); // 86400000 = 24H
  }
};
