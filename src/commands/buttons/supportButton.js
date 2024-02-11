const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client, MessageButton, MessageActionRow } = require("discord.js");
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config();

module.exports = class SupportButton extends BaseCommand {
  constructor() {
    super('supportbutton', 'test', [], true, "Ajoute le bouton support", null, new PermissionGuard(["ADMINISTRATOR"]));
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
        .setLabel('✉ Ouvrir un ticket ✉')
        .setCustomId('openSupport')
      )
     

      const supportEmbed = new MessageEmbed()
      .setTitle('Demande de support')
      .setDescription("Une question ? Tu souhaite devenir vendeur ? N'hésite pas à ouvrir un ticket !\nNotre équipe est là pour vous répondre dans les meilleurs délais.")
      .addFields(
        {name: "Note :", value: `**MERCI DE NE PAS OUVRIR DE TICKET POUR LES LAISSER INACTIFS ! AUQUEL CAS, LA CREATION DE TICKETS VOUS SERA BLOQUÉE.**` },

    )
      .setColor('RANDOM')   

      message.channel.send({embeds: [supportEmbed], components: [Buttons]});
     
      

    }
}