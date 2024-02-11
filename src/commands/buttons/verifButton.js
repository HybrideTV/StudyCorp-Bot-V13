const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client, MessageButton, MessageActionRow } = require("discord.js");
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config();

module.exports = class VerifButton extends BaseCommand {
  constructor() {
    super('verifbutton', 'test', [], true, "Ajoute le bouton support", null, new PermissionGuard(["ADMINISTRATOR"]));
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
        .setLabel('Vérifier')
        .setCustomId('verifButton')
      )
     
      const verifEmbed = new MessageEmbed()
      .setTitle("<a:check:822499245089226813> **Vérification** <a:check:822499245089226813>") 
        .addFields(
          {name:'\u200B' , value: "Veuillez cliquer sur le bouton ci-dessous pour avoir accès au serveur ! \nN'oublie pas que le règlement et à lire pour éviter toute sanctions." },
          {name: '\u200B', value: "Please click on the button below to access the server! Don't forget to read the rules to avoid any penalties!" },

  
      )
        .setColor(0x00ff1f)
        .setThumbnail('https://studycorp.fr/images/logo.png')  
      message.channel.send({embeds: [verifEmbed], components: [Buttons]});
     
      

    }
}