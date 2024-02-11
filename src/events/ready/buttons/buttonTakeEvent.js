const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  MessageCreate, Client, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed } = require("discord.js");
const config = require("../../../../configuration.json");
const ticketDb = require("../../../utils/database/models/tickets");
const api = require("../../../../API");

module.exports = class buttonTakeEvent extends BaseEvent {
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
            if (interaction.customId === 'takeTicket') {
                const member = await interaction.guild.members.fetch(interaction.user.id);
                if (member.roles.cache.has(`${config.role_vendeur}`)) {
                    interaction.channel.setName('pris-' + interaction.user.username)
                    interaction.channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true, ATTACH_FILES: true});
                    interaction.channel.permissionOverwrites.edit('772514297150570577', { VIEW_CHANNEL: false});

                    const id = interaction.channel.topic;
                    console.log(id);
                    
                    ticketDb.updateOne({ idticket: id }, { pris: interaction.user.id }, function(
                        err,
                        result
                      ) {
                        if (err) {
                          console.log(err);
                        }
                      });

                      const btns = new MessageActionRow()
                      btns.addComponents(
                        new MessageButton()
                        .setStyle('DANGER')
                        .setLabel("Demander l'intervention du staff")
                        .setCustomId('interTicket'),
                        new MessageButton()
                        .setStyle('SUCCESS')
                        .setLabel('Fermer le ticket')
                        .setCustomId('closeTicket'),
                        new MessageButton()
                        .setStyle('SECONDARY')
                        .setLabel("Réouvrir le ticket")
                        .setCustomId('reopenTicket'),)
                    const taketicket = new MessageEmbed()
                        .setTitle(`Bonne nouvelle ! La commande à été prise par `+ interaction.user.username )
                        .setDescription("Prochaines étapes de la commande : \n <a:led_no:815549887893864469> Ne laissez pas votre commande inactive ! \n <a:led_yes:815549887893864448> En cas de besoin, vous pouvez demander l'intervention du staff.\n")
                        .setColor(0xf1fc07)
                        await interaction.channel.send({ embeds: [taketicket], components: [btns] }).then((msg) => msg.pin());

                        const logsEmbed = new MessageEmbed()
                        .setTitle(`Une commande à été prise par : ${interaction.user.username}`)
                        .setColor('#a576fc')
                        .addFields(
                          {name: "Commande prise par :", value: `${interaction.user.username}`, inline: true },
                          {name: "Commande créée par", value: `${await api.getClient(interaction.channel.topic)}`, inline: true },
                          {name: "ID de la commande", value: `${interaction.channel.topic}`, inline: true }

                      )
                      await interaction.guild.channels.cache.get(`${config.channel_logs}`).send({ embeds: [logsEmbed] });

                    }
                }
                
        })
    }
}