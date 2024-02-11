const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  MessageCreate, Client, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed } = require("discord.js");
const config = require("../../../../configuration.json");
const api = require("../../../../API");

const BlacklistDatabase = require("../../../utils/database/models/blacklist");
const TicketDatabase = require("../../../utils/database/models/tickets");


module.exports = class buttonOpenTickets extends BaseEvent {
    constructor() {
        super('ready');
    }

    /**
     * 
     * @param {Client} client 
     * @param {MessageCreate} message 
     * @param {*} user 
     * @param {ButtonInteraction} interaction
     */
    async run(client, message, user, interaction) {

       //LISTE DES BOUTONS
        client.on('interactionCreate', async(interaction) => {
            if (interaction.customId === 'openSupport') {
                const TicketButtonsS = new MessageActionRow()
                TicketButtonsS.addComponents(
                new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('💵 Recrutement Vendeur')
                .setCustomId('recv'),
                new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('👮 Recrutement Staff')
                .setCustomId('recs'),
                new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('🕯️ Demande grade CLIENT')
                .setCustomId('gradeclient'),
                new MessageButton()
                .setStyle('DANGER')
                .setLabel('📕 Réclamation')
                .setCustomId('recl'),
                new MessageButton()
                .setStyle('DANGER')
                .setLabel('❌ Fermer')
                .setCustomId('closeTicket')
                )
                
                var channel_ticket = interaction.guild.channels.create('support-' + interaction.user.username, {
                    type: 'GUILD_TEXT',
                    parent: `${config.category_support}`,
                    permissionOverwrites: [{
                            id: '739495969778827306', //EVERYONE
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: '1024224180218118164',
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: '1059527883523104840',
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.user,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: `${config.role_moderateur}`,
                            allow: ['VIEW_CHANNEL'],
                        },
                    ]
                }).then(async channel_ticket => {
                   
                    const cmd = new MessageEmbed()
                        .setTitle("Bonjour ! Merci d'avoir pris contact avec notre support ! Merci de sélectionner le motif de votre ticket.")
                        .setColor(0x00ffa6)
                    channel_ticket.send({ embeds: [cmd], components: [TicketButtonsS]}).then((msg) => msg.pin());
                    await interaction.reply({content: `Vous avez ouvert une demande de support : <#${channel_ticket.id}>`, ephemeral: true });

                })
            } else if (interaction.customId === 'openTicket') {
                const TicketButtons = new MessageActionRow()
                TicketButtons.addComponents(
                new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('🎫 Prendre')
                .setCustomId('takeTicket'),
                new MessageButton()
                .setStyle('DANGER')
                .setLabel('❌ Fermer')
                .setCustomId('closeTicket'),
                new MessageButton()
                .setStyle('LINK')
                .setLabel("🖥 Besoin d'un hébergement ?")
                .setURL('https://www.ouiheberg.com')     
               )
                let guild = interaction.guild;
                let member = guild.members.cache.get(interaction.user.id);
                var channel_ticket = guild.channels.create('commande-' + interaction.user.username, {
                    type: 'GUILD_TEXT',
                    parent: `${config.category_commande}`,
                    permissionOverwrites: [{
                            id: '739495969778827306', //EVERYONE
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: '1059527883523104840',
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.user,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: `${config.role_vendeur}`, 
                            allow: ['VIEW_CHANNEL'],
                        },

                    ]
                }).then(async channel_ticket => {   
                let bankAccount = await api.getBank(interaction.user.id);
                
                const cmd = new MessageEmbed()
                .setTitle(`Bonjour ${interaction.user.username} !`)                        
                .setColor(0x0e8eff)
                .setDescription("**◉ Pense à __envoyer un cahier des charges__ concernant ta commande.** \n**◉ __Active les notifications__ du ticket !**")
                .addFields(
                    {name: '**Règlement des commandes**', value: '◆ Vous serez **blacklist** si vous ne donnez aucune nouvelles \n◆ Il est **interdit de discuter en dehors du salon** \n*(Le cas échéant, aucun support ne sera donné, et vous serez sanctionés pour pub si vous invitez sur un autre serveur.)*', inline: true },
                    {name: '\u200B', value: '\u200B', inline: true },
                    {name: "En cas de problème, vous avez la possibilité de demander l'intervention du staff.", value: '\u200B', inline: true },
                    {name: "Retrouvez une sauvegarde de vos tickets ici :", value: 'https://espace-client.studycorp.fr', inline: true },
                    {name: "Besoin d'un hébergement ?", value: ' -10% réccurent avec le code **STUDYCORP** chez notre partenaire ouiheberg', inline: true },
                    {name: "Vos points de fidélité :", value: `${bankAccount}`, inline: true },
                )

                channel_ticket.send({ embeds: [cmd], components: [TicketButtons]});
                    let userblacklist = await BlacklistDatabase.findOne({ userid : interaction.user.id});
                    if (userblacklist) {
                    let userblacklistMotif = userblacklist.get("motif");
                    let userblacklistMotif2 = userblacklist.get("pseudo");
                    let userblacklistMotif3 = userblacklist.get("userid");
                        const ublEmbed = new MessageEmbed()
                        .setTitle("🔒 Prudence ! Ce client est blacklist !🔒")                        
                        .setColor(0xfc3b07)
                        .setDescription(`Pseudo/Id : ${userblacklistMotif2} / ${userblacklistMotif3} \n Motif: ${userblacklistMotif}`)
                        channel_ticket.send({ embeds: [ublEmbed] });
                        return;
                    }else{
                        const ublEmbed2 = new MessageEmbed()
                        .setTitle("<:verified:876385892590301185> Ce client n'est pas blacklist ! <:verified:876385892590301185>")                        
                        .setColor(0x0eff33)
                        channel_ticket.send({ embeds: [ublEmbed2] });
                    }
                    const nbr = Math.floor(Math.random() * 999999999);
                    let createTicket = new TicketDatabase({
                        userId: interaction.user.id,
                        timestamp: Date.now(),
                        pseudo: interaction.user.username,
                        avatar: interaction.user.avatar,
                        pris: "0",
                        idticket: nbr
                    });
                    createTicket.save().catch(err => console.log(err)); 
                    await channel_ticket.setTopic(nbr);
                    await interaction.reply({content: `Vous avez ouvert un ticket commande : <#${channel_ticket.id}>`, ephemeral: true });
                })
            }
        })
    }
}
