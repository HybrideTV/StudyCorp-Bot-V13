const { MessageCreate, Client, MessageEmbed } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const TicketMessage = require('../../utils/database/models/ticketsmessage')
module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('messageCreate');
    }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */

    async run(client, message) {


      function escapeHtml(text) {
        return text
        .replace(/'/g, "&nbsp;")
        .replace(/"/g, "&nbsp;")
        .replace(/`/g, "&nbsp;")
    }


      if(message.channel.parentId == '739505204487127200'){
        if(message.author.bot) return;
      if(message.channel.id != "831892502368747570" && message.channel.id != "772523677652484117" && message.channel.id != "785564862859313153" && message.channel.id != "883269644260098068" && message.channel.id != "938178138310053928" && message.channel.id != "883264239987490848" && message.channel.id != "795348095017025566" && message.channel.id != "781999068489449502" && message.channel.id != "739500728493801474") {
     var id = message.channel.topic;
     let addTicketMessage = new TicketMessage({
      userId: message.author.id,
      userPseudo: message.author.username,
      idticket: id,
      timestamp: Date.now(),
      content: escapeHtml(message.content),
      avatar: message.author.avatar,
  });

  if (message.attachments.size > 0) {
    const attachment = message.attachments.first();
    const url = attachment ? attachment.url : null;
    let addTicketImage = new TicketMessage({
      userId: message.author.id,
      userPseudo: message.author.username,
      idticket: id,
      timestamp: Date.now(),
      content: url,
      avatar: message.author.avatar,
  });
  await addTicketImage.save().catch(err => console.log(err)); 

   
  }
  await addTicketMessage.save().catch(err => console.log(err)); 

    }
    }

    
        //SUGGESTION
        if (message.author.bot) return;
        if (message.channel.id === "796316078309244948") {
            let { content, author } = message;
            const suggestion = new MessageEmbed()
                .setTitle(`Suggestion de ${author.username}`)
                .setColor('RANDOM')
                .setDescription(content)
                .setTimestamp()
            message.delete();
            message.channel.send({ embeds: [suggestion] }).then(msg => {
                msg.react("✅");
                msg.react("❌");
            });
            return;
        }

        //PUBLICITE
    if (message.author.bot) return;
        if (message.content.startsWith(client.prefix)) {
            const [cmdName, ...cmdArgs] = message.content
            .slice(client.prefix.length)
            .trim()
            .split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
              command.run(client, message, cmdArgs);
            }
          }
        }
    
}