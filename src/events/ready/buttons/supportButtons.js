const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const supportBlacklist = require("../../../utils/database/models/supportBlacklist");

module.exports = class SRecrutement extends BaseEvent {
    constructor() {
        super('ready');
    }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     */
    async run(client, message, user) {
       client.on('interactionCreate', async(interaction) => {
        if (interaction.customId === 'gradeclient') {            
            const cmd = new MessageEmbed()
                    .setTitle("💙 **Obtenir le grade client** 💙")
                    .setDescription("Nous vous rappellons que vous devez avoir au minimum 2 à 4 commandes réalisées avec succès pour obtenir ce grade. \n\nUn membre du staff procedera à la vérification et vous attribuera le grade.")
                    .setColor(0x2becff)
                interaction.channel.send({ embeds: [cmd] });
        }
        else if (interaction.customId === 'recl') {            
            const cmd = new MessageEmbed()
                    .setTitle("🛑 Dépôt d'une réclamation 🛑")
                    .setDescription("Vous devez nous donner toutes les informations nécéssaires au traitement de votre réclamation (Nature, personne concernées, faits, ...). \n\nCelle-ci sera prise en charge par notre équipe de responsable sous peu. \n\nMerci de rester patient.")
                    .setColor(0xdf2525)
                interaction.channel.send({ embeds: [cmd]});
        }else if (interaction.customId === 'recs') { 
                const supportB2 = new MessageActionRow()
  
                supportB2.addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Formulaire de recrutement (MODÉRATEUR UNIQUEMENT)')
                    .setURL('https://forms.gle/yFhTNdQwxAAeu8BM7'))         
                const cmd = new MessageEmbed()
                        .setTitle("☎️ **Rejoindre notre équipe ?** ☎️")
                        .setDescription("Vous trouverez la liste des postes disponibles dans le salon Recrutement staff ! \n\nSi vous avez encore besoin d'aide, écrivez votre question, un membre du support prendra votre demande !")
                        .setColor(0xcedf25)
                    interaction.channel.send({ embeds: [cmd], components: [supportB2]});
            }else if (interaction.customId === 'recv') {      
                const supportB = new MessageActionRow()
                supportB.addComponents(
                new MessageButton()
                .setStyle('LINK')
                .setLabel('Formulaire de recrutement')
                .setURL('https://forms.gle/qTR31Wa2sjNMpTgN8'))
                    const vendeurinfoembed = new MessageEmbed()
                        .setTitle("💵 **Rejoindre nos vendeurs ?** 💵")
                        .setColor(0x55fecb)
                        .addFields(
                            { name: 'Prérequis :', value: "> Avoir 15 ans révolus \n> Avoir au minimum 6 mois d'expérience + des travaux à montrer" },
                            { name: '\u200B', value: 'Tout formulaire qui sera pas ou mal rempli sera systématiquement refusé.'}
                        )
                    interaction.channel.send({ embeds: [vendeurinfoembed], components: [supportB] });

                    let userblacklist = await supportBlacklist.findOne({ userid : interaction.user.id});
                    if (userblacklist) {
                    let userblacklistMotif = userblacklist.get("motif");
                    let userblacklistMotif2 = userblacklist.get("pseudo");
                    let userblacklistMotif3 = userblacklist.get("userid");
                        const ublEmbed = new MessageEmbed()
                        .setTitle("🔒 Prudence ! Une blacklist à été ajoutée à ce membre !🔒")                        
                        .setColor(0xfc3b07)
                        .setDescription(`Pseudo/Id : ${userblacklistMotif2} / ${userblacklistMotif3} \n Motif: ${userblacklistMotif}`)
                        interaction.channel.send({ embeds: [ublEmbed] });
                        return;
                    }else{
                        const ublEmbed2 = new MessageEmbed()
                        .setTitle("<:verified:876385892590301185> Ce membre n'est pas blacklist ! <:verified:876385892590301185>")                        
                        .setColor(0x0eff33)
                        interaction.channel.send({ embeds: [ublEmbed2] });
                    }

            }
        })
    }
}