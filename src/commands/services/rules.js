const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
require("dotenv").config();

module.exports = class rules extends BaseCommand {
  constructor() {
    super("rules");
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   */
  run(client, message, args) {
    const r1 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**1️⃣ GÉNÉRAL**__")
      .addFields(
        {
          name: "➤ Vous pouvez proposer vos services contre rémunération ou bénévolement.",
          value:
            "➤ Vous pouvez proposer uniquement les services pour lesquels vous avez les grades.",
        },
        {
          name: "➤ Les discussions se trouvant dans les tickets ou salons vendeurs ne doivent pas être divulguées en dehors.",
          value:
            "➤ Les clients qui arnaquent, litige ou autre, doivent être signalés rapidement pour leur retirer l’accès aux commandes ainsi que les blacklist.",
        },
        {
          name: "➤ **Vous devez être un minimum actif sur les tickets ! Au bout de 3 mentions lors d'une recherche de vendeurs, si vous n'y répondez pas (même négativement), vous serez considérés comme inactifs et donc avec le risque d'une exclusion.**",
          value: "\u200B",
        }
      );
    const r2 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**2️⃣ TICKETS**__")
      .addFields(
        {
          name: "➤ Il est **interdit d'inviter un client sur votre propre discord pour réaliser la commande**. Celle ci doit être réalisée dans le ticket afin de bénéficier d'un support. Le cas échant, il s'agit de pub donc des sanctions seront prises.",
          value:
            "➤ Ne prenez pas de tickets si vous n’avez pas les compétences et/ou le temps pour le faire.",
        },
        {
          name: "➤ Si aucun vendeur n’est mentionné dans le ticket, chacun est libre de prendre .",
          value:
            "➤ Vous devez donner les sources lors de développement (bot, plugin..).",
        },
        {
          name: "➤ Il est **strictement interdit** de proposer de l'hébergement ou en faire de la pub !  Vous devez proposer impérativement en priorité notre hébergeur partenaire.",
          value: "\u200B",
        }
      );
    const r3 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**3️⃣ PRIX / PAIEMENTS / LITIGES**__")
      .addFields({
        name: "➤ Les prix abusifs sont à proscrire ! Vous n'êtes pour la plupart pas des pro, donc mettez vous ça en tête.",
        value:
          "➤ Il est fortement conseillé de demander une avance sur vos commandes.",
      });
    const r4 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**4️⃣ FORUM VOS CRÉATIONS**__")
      .addFields({
        name: "➤ Un seul sujet par vendeur. Nous vous recommandons fortement d'en créer un.",
        value:
          "➤ Vous pouvez poster vos créations. Ce n'est pas un salon où mettre vos tarifs et parler de votre vie. C'est un simple portefolio mais qui permet aux clients de voir le travail que vous pouvez faire.",
      });
    const r5 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**5️⃣ GRADES**__")
      .addFields({
        name: "➤  Le grade vendeur confirmé est donné aux vendeurs de confiances ayant réalisé plusieurs commandes avec succès. \nIl n’est pas systématiquement donné, le grade sera donné à la libre appréciation du staff.",
        value:
          "➤  Le grade Vendeur Déclaré s'obtiens uniquement si vous êtes déclaré (logique).",
      });
    const r6 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**6️⃣ AVERTISSEMENTS**__")
      .addFields(
        {
          name: "➤ Vous recevrez des avertissements (Tickets inactifs, tickets sans réponses, prix abusifs, ...), ainsi que tout manquement à ce règlement.",
          value:
            "➤ Au bout de 2 avertissements ( ou 1 grave ), vous vous verrez supprimer votre rôle vendeur confirmé si vous l'avez, le 3ème avertissement vaut la suppression du rôle de vendeur à vie.",
        },
        {
          name: "➤ Vos avertissements peuvent être consultés depuis le site vendeurs.",
          value: "\u200B",
        }
      );
    const r7 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**7️⃣ FORUM VENTES EXCLUSIVES**__")
      .addFields(
        {
          name: "➤ Vous pouvez ici créer des sujets pour vendre des maps, overlays, etc...",
          value: "➤ Ce n'est pas un salon tarif !",
        },
        {
          name: "➤ C'est prévu pour vendre une seule fois, d'où le nom.",
          value: "\u200B",
        }
      );
    const r8 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**8️⃣ PROMOTIONS**__")
      .addFields(
        {
          name: "➤ Des promotions sur les services seront faites. Les promotions sont valable sur l'ensemble des services, seront d'un pourcentage faible (5%  + ou -)",
          value:
            "*(Max 2 à 3 fois par an, a partir d'un montant minimum de commande). *",
        },
        {
          name: "Durant la période promotionnelle, vous devrez appliquer la promotion, sur les prix que vous proposerez",
          value: "\u200B",
        }
      );
    const r9 = new MessageEmbed()
      .setColor("#06FFA4")
      .setTitle("__**9️⃣ POINTS DE FIDÉLITÉ**__")
      .addFields({
        name: "➤ Les clients peuvent utiliser leurs points de <#1134844818426691645> . Vous êtes dans l'obligation d'appliquer la réduction.",
        value: "\u200B",
      });

    const r10 = new MessageEmbed()
      .setColor("#06ff61")
      .setDescription(
        "**J'ai bien lu le règlement et je m'engage à le respecter.**\n*Dernière mise à jour : 07/08/2023*"
      );
    message.channel.bulkDelete(1);
    message.channel.send({ embeds: [r1, r2, r3, r4, r5, r6, r7, r8, r9] });
    message.channel.send({ embeds: [r10] }).then((msg) => {
      msg.react("✅");
    });
  }
};
