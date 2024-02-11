const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
require('dotenv').config();
const bankDb = require('../../utils/database/models/bank');

module.exports = class remPts extends BaseCommand {

    constructor() {
          super('rempts', 'services', [], true);
      }
          /**
       * 
       * @param {Client} client 
       * @param {Message} msg 
       * @param {Array} args 
       */
      async run(client, msg, args) {
        if (!msg.member.roles.cache.has('1135173965350973450')) msg.channel.send("Vous n'avez pas la permission de retirer des points !");
        let target = msg.mentions.users.first();
        if(target){
            let addEmbed = new MessageEmbed()
            .setColor(0x06FFA4)
            .setDescription(`${args[0]}, ${args[1]} points ont été retirés !`)
            .setTimestamp(Date.now())
            await bankDb.updateOne({userId: target.id}, {$inc: {money : -args[1]}});
            msg.channel.bulkDelete(1);
            msg.channel.send({ embeds: [addEmbed] });
        }else{
            msg.channel.send("Vous devez mentionner un client. Rappel de l'usage : <@> -<Nb de pts>")
        }

            

      }
  }