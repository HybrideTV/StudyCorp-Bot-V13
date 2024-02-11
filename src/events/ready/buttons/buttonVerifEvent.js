const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  MessageCreate, Client, MessageActionRow, MessageButton } = require("discord.js");
const api = require('../../../../API');

module.exports = class buttonVerifEvent extends BaseEvent {
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
            
            if (interaction.customId === 'verifButton') {
                let n = await api.getRaidStatus('739495969778827306');
                if(n != '0' ){
                    interaction.reply({content: "Le mode RAID est actuellement activé, il n'est pas possible de procéder à votre vérification. Veuillez réessayer plus tard.",  ephemeral: true});
                }else{
                    let buttonMember = interaction.member;
                    let guild = interaction.guild;
                    let member = interaction.guild.members.cache.get(interaction.user.id);
                    let role = guild.roles.cache.find(r => r.id === "739498020667785267");
                    let role2 = guild.roles.cache.find(r => r.id === "811256922900660245");
                    buttonMember.roles.add(role);
                    buttonMember.roles.add(role2);
                }
            }
        })
    }
}