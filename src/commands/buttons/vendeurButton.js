const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client, MessageButton, MessageActionRow } = require("discord.js");
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config();

module.exports = class CVendeurRoles extends BaseCommand {
  constructor() {
    super('vendeurbutton', 'test', [], true, "Ajoute le bouton support", null, new PermissionGuard(["ADMINISTRATOR"]));
  }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     * @param {Array} args 
     */
     run(client, message, user, args) {
      const ButtonsV = new MessageActionRow()
      ButtonsV.addComponents(
        new MessageButton()
        .setStyle('PRIMARY')
        .setLabel('Notifications vendeurs')
        .setCustomId('vendeurbutton'),
        new MessageButton()
        .setStyle('PRIMARY')
        .setLabel('Notifications gca')
        .setCustomId('gcabutton')
      )
     
      const verifEmbed = new MessageEmbed()
      .setTitle("Gestion des notifications") 
      .setColor(0x1a35f7)
      .setThumbnail('https://studycorp.fr/images/logo.png')  
      message.channel.send({embeds: [verifEmbed], components: [ButtonsV]});
     
      

    }
}