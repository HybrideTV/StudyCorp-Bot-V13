const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client, MessageButton, MessageActionRow } = require("discord.js");
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config();

module.exports = class CVendeurRoles extends BaseCommand {
  constructor() {
    super('rolesbuttons2', 'test', [], true, "Ajoute le bouton support", null, new PermissionGuard(["ADMINISTRATOR"]));
  }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     * @param {Array} args 
     */
     run(client, message, user, args) {
      const rolesButton1 = new MessageActionRow()
      rolesButton1.addComponents(
        new MessageButton()
        .setStyle('SUCCESS')
        .setLabel('📌 Annonces')
        .setCustomId('annoncebutton'),
        new MessageButton()
        .setStyle('SUCCESS')
        .setLabel('✏️ Nouveautés')
        .setCustomId('newsbutton'),
        new MessageButton()
        .setStyle('SUCCESS')
        .setLabel('📘 Partenariats')
        .setCustomId('partenariatbutton'),
        new MessageButton()
        .setStyle('SUCCESS')
        .setLabel('🎁 Concours')
        .setCustomId('gabutton'),
        new MessageButton()
        .setStyle('SUCCESS')
        .setLabel('🕹️ Jeux')
        .setCustomId('jeuxbutton')
      )

      const rolesButton2 = new MessageActionRow()
      rolesButton2.addComponents(
        new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('👦 Homme')
        .setCustomId('hommebutton'),
        new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('👧 Femme')
        .setCustomId('femmebutton'),
        new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('🍻 Majeur')
        .setCustomId('majeurbutton'),
        new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('👶 Mineur')
        .setCustomId('mineurbutton')
      )


      const rolesButton3 = new MessageActionRow()
      rolesButton3.addComponents(
        new MessageButton()
        .setStyle('PRIMARY')
        .setLabel('🇫🇷 Français')
        .setCustomId('frbutton'),
        new MessageButton()
        .setStyle('PRIMARY')
        .setLabel('🇬🇧 English')
        .setCustomId('enbutton'),
      )
     
      const rolesEmbed1 = new MessageEmbed()
      .setTitle("Vos notifications") 
      .setColor(0x1a35f7)
      .setDescription("Afin d'éviter trop de mentions inutiles, vous pouvez choisir ce qui vous intéresse parmis les notifications disponibles :)")
      message.channel.send({embeds: [rolesEmbed1], components: [rolesButton1]});
     
      const rolesEmbed2 = new MessageEmbed()
      .setTitle("Vous êtes...") 
      .setColor(0x1a35f7)
      message.channel.send({embeds: [rolesEmbed2], components: [rolesButton2]});

      const rolesEmbed3 = new MessageEmbed()
      .setTitle("Vous parlez...") 
      .setColor(0x1a35f7)
      message.channel.send({embeds: [rolesEmbed3], components: [rolesButton3]});

    }
}