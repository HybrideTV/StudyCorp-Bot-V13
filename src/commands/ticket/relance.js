const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate } = require("discord.js");
require('dotenv').config();
const config = require("../../../configuration.json");
const api = require("../../../API");

module.exports = class Relance extends BaseCommand {
    constructor() {
        super('rel', 'relance', [], true, "Relancer des commandes.");
    }

    async run(client, msg, args) {
        let action = args[0];
        const member = await msg.guild.members.fetch(msg.author.id);
    
            if(msg.channel.id == '785564862859313153') return; 
            if(msg.channel.parentId == `${config.category_commande}`){
            if (member.roles.cache.has(`${config.role_vendeur}`)) {
                let vendeurId = await api.getVendeurId(msg.channel.topic);
                let clientId = await api.getClientId(msg.channel.topic);

                const relanceembed = new MessageEmbed()
                .setTitle("**Votre ticket est inactif !**")
                .setColor(0xff0000)
                .setFooter({text: "StudyCorp", iconURL: 'https://studycorp.fr/images/logo.png'})
                .setDescription("Ceci est une relance car ce ticket est inactif depuis plusieurs jours.")
                .addFields(
                    {name: "➤ Votre commande est terminée ?", value: "Merci de le signaler afin qu'un avis puisse être déposé."},
                    {name: "➤ Toujours en cours ?", value: "Nous vous invitons à communiquer sur l'avancée de la commande, les problèmes éventuels."}
                )

                const relanceembedmpvendeur = new MessageEmbed()
                .setTitle("**Rappel de votre commande sur StudyCorp**")
                .setColor(0xff0000)
                .setFooter({text: "StudyCorp", iconURL: 'https://studycorp.fr/images/logo.png'})
                .setDescription("Nous vous rappelons que vous avez une commande en cours sur StudyCorp. Nous vous invitons vivement à communiquer à votre client l'avancée de la commande, voir de le relancer si besoin." )

                const relanceembedmpclient = new MessageEmbed()
                .setTitle("**Rappel de votre commande sur StudyCorp**")
                .setColor(0xff0000)
                .setFooter({text: "StudyCorp", iconURL: 'https://studycorp.fr/images/logo.png'})
                .setDescription("Nous vous rappelons que vous avez une commande en cours sur StudyCorp. Nous vous invitons à prendre des nouvelles auprès de votre vendeur. Auquel cas, le ticket sera clôs. " )

                msg.channel.bulkDelete(1)
                msg.channel.send({ embeds: [relanceembed] });
                msg.channel.send(`<@${vendeurId}> / <@${clientId}>`)
                
                



                }
            

    }
    }
};