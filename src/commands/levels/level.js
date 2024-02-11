const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
require('dotenv').config();
const Levels = require('discord-xp');

module.exports = class level extends BaseCommand {

    constructor() {
        super('level');
    }
          /**
       * 
       * @param {Client} client 
       * @param {Message} message 
       * @param {Array} args 
       */
      async run(client, message, args) {
        if (message.author.bot) return;
            const target = message.mentions.members.first() || message.author;
            const user = await Levels.fetch(target.id, message.guild.id);
            var xpRequired = Levels.xpFor(user.level + 1);
            if(!user) return message.channel.send("Il semble que vous n'avez pas d'XP :/")
            message.channel.send(`**${target.username}** est actuellement **niveau ${user.level}** avec **${user.xp.toLocaleString()} XP**. \n*Il faut ${xpRequired} XP pour passer au niveau suivant !*`);
        }
        
  }