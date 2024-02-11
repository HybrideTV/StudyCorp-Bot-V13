
const { Client, Intents, MessageCreate } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const BaseEvent = require('./utils/structures/BaseEvent');

const config = require('../slappey.json');
const mongoose = require('mongoose');

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS, 
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_INTEGRATIONS,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS
],    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],});

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();
