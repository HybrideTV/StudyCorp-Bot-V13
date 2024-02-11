const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  MessageCreate, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = class buttonVendeur extends BaseEvent {
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
       //LISTE DES BOUTONS
        client.on('interactionCreate', async(interaction) => {
            
            if (interaction.customId === 'vendeurbutton') {
                let buttonMember = interaction.member;
                let guild = interaction.guild;
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "1081896961784958976");
                if(member.roles.cache.has('1081896961784958976')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Notifications vendeur retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Notifications vendeur ajouté', ephemeral: true });

                }
                
            }

            if (interaction.customId === 'gcabutton') {
                let buttonMember = interaction.member;
                let guild = interaction.guild;
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "938110074671468584");
                if(member.roles.cache.has('938110074671468584')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Notifications gca retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Notifications gca ajouté', ephemeral: true });

                }
                
            }
        })
    }
}