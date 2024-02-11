const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
require('dotenv').config();

module.exports = class Trustpilot extends BaseCommand {

    constructor() {
        super('trustpilot');
    }
          /**
       * 
       * @param {Client} client 
       * @param {Message} message 
       * @param {Array} args 
       */
      run(client, message, args) {
        const trustpilot = new MessageEmbed()
            .setColor('#86ff33')
            .setTitle('Trustpilot - Déposez un avis !')
            .setDescription("Tu apprécie notre serveur discord ? Donne nous un avis sur notre trustpilot 😀\nhttps://fr.trustpilot.com/evaluate/studycorp.fr")
            .addFields(
                { name: "Besoin d'entraide ? ", value: `Rendez vous dans le salon <#1054742040795152414> !`, inline: true  },
                { name: "Besoin d'un service ? ", value: `Passez commande auprès de nos vendeurs <#739500728493801474>`, inline: true  },
                { name: "Nos services", value: `Passez commande auprès de nos vendeurs <#1065208138778824777>`, inline: true  },

                )
        message.channel.bulkDelete(1);
        message.channel.send({ embeds: [trustpilot] });
    }
    
  }