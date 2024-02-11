const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client, MessageButton, MessageActionRow } = require("discord.js");
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config(); 

module.exports = class TicketButton extends BaseCommand {
  constructor() {
    super('ticketbuttonc', 'test', [], true, "Ajoute le bouton ticket", null, new PermissionGuard(["ADMINISTRATOR"]));
  } 

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     * @param {Array} args 
     */
     run(client, message, user, args) {
      const Buttons = new MessageActionRow()
      Buttons.addComponents(
        new MessageButton()
        .setStyle('PRIMARY')
        .setLabel('🛒 Passer une commande 🛒')
        .setCustomId('openTicket')
      )
           
      const ticketEmbed1 = new MessageEmbed()
      .setTitle("📋 Création d'une commande")
      .setColor('#06FFA4')
      .setDescription("Pour commander un de nos services, vous devez cliquer sur le bouton qui se situe tout en bas du message. \nUne fois le ticket ouvert, vous pourrez exprimer votre demande.\n\n Veuillez envoyer un cahier des charges en lien avec votre commande. \nCelui ci permettra à nos vendeurs de vous faire un devis relativement précis selon vos besoins et vos attentes.")
      const ticketEmbed2 = new MessageEmbed()
      .setTitle('💸 Prise en charge de votre commande')
      .setColor('#06FFA4')
      .setDescription("Nos vendeurs intéréssés vous proposeront des devis, à vous de choisir celui qui correspond le mieux à vos besoin. \nLe vendeur qui vous conviens, pourra prendre la commande afin de rendre le salon privé.\n\nUne grande partie de nos vendeurs demandent une avance sur le paiement de votre commande, afin d'éviter des impayés, commandes sans nouvelles, etc..")
      const ticketEmbed3 = new MessageEmbed()
      .setTitle('🔧 Suivi de votre commande')
      .setColor('#06FFA4')
      .setDescription("Nous accordons une grande importance au suivi de votre commande. \nChaque vendeur doit impérativement vous informer de l'état actuel de votre commande.\n \nSi un problème devait apparaître durant le processus de votre commande, notre équipe de support se fera un plaisir de se joindre à vous pour résoudre celui-ci.")
      const ticketEmbed4 = new MessageEmbed()
      .setTitle('📨 Livraison de votre commande')
      .setColor('#06FFA4')
      .setDescription("La livraison de votre commande sera effectuée une fois la totalité du paiement effectué. En fonction de sa nature, la commande peut être livrée sous plusieurs formats.\n \nÀ la fin de la commande, nous vous ajouterons vos points de fidélité gagnés avec cette commande. \nNous vous inviterons également à déposer un avis dans le salon prévu à cet effet.")
      message.channel.send({embeds: [ticketEmbed1, ticketEmbed2, ticketEmbed3, ticketEmbed4], components: [Buttons]});
    }
}