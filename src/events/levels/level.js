const BaseEvent = require('../../utils/structures/BaseEvent');
const { Client, MessageEmbed, MessageCreate } = require('discord.js');
const Levels = require("discord-xp");
module.exports = class level extends BaseEvent {
  constructor() {
    super('messageCreate');
  }
  
  /**
         * 
         * @param {Client} client 
         * @param {Message} message 
         * @param {Array} args 
         */

  async run(client, message) {

    if (message.author.bot) return;

    const randomAmoutOfXp =  Math.floor(Math.random() * 10) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmoutOfXp);
    if(hasLeveledUp){
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Félicitation ${message.author}, tu es passé niveau ${user.level} !`)
        if(user.level === 5){
          let member = message.guild.members.cache.get(message.author.id);
          let role = message.guild.roles.cache.find(r => r.id === "969539500739031052");
          member.roles.add(role);
        }else if(user.level === 10){
          let member = message.guild.members.cache.get(message.author.id);
          let role = message.guild.roles.cache.find(r => r.id === "969539591839285288");
          member.roles.add(role);
        }else if(user.level === 15){
          let member = message.guild.members.cache.get(message.author.id);
          let role = message.guild.roles.cache.find(r => r.id === "969539715504148500");
          member.roles.add(role);
        }else if(user.level === 20){
          let member = message.guild.members.cache.get(message.author.id);
          let role = message.guild.roles.cache.find(r => r.id === "969539824996474890");
          member.roles.add(role);
        }
    }
  }
}
