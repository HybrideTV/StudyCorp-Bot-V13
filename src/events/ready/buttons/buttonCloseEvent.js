const BaseEvent = require('../../../utils/structures/BaseEvent');
const { Message, Client, MessageButton, ButtonInteraction} = require("discord.js");

module.exports = class buttonCloseEvent extends BaseEvent {
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
            if (interaction.customId === 'closeTicket') {            
                interaction.channel.delete();
            }
        })
    }
}