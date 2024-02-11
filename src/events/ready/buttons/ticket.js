const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  MessageCreate, Client, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed } = require("discord.js");
const config = require("../../../../configuration.json");
module.exports = class reop extends BaseEvent {
    constructor() {
        super('ready');
    }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     * @param {ButtonInteraction} interaction
     */
    async run(client, message, user, interaction) {
       //LISTE DES BOUTONS
       client.on('interactionCreate', async(interaction) => {
            if (interaction.customId === 'reopenTicket') {
                const member = await interaction.guild.members.fetch(interaction.user.id);
                if (member.roles.cache.has(`${config.role_vendeur}`)) {
                    interaction.channel.permissionOverwrites.edit('772514297150570577', { VIEW_CHANNEL: true});

            
                    const openEmbed = new MessageEmbed()
                        .setTitle(`Votre ticket à été ouvert par : `+ interaction.user.username)
                        interaction.channel.send({ embeds: [openEmbed] });
                    }
                }
                else if (interaction.customId === 'interTicket') {            
                    const cmd = new MessageEmbed()
                            .setTitle("L'intervention du staff à été demandée.")
                            .setDescription("Merci de patienter.")
                            .setColor(0xdf2525)
                        interaction.channel.send({ embeds: [cmd]});
                        interaction.channel.send(`<@&1059527883523104840>`);
                }
                
        })
    }
}