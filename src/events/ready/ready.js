const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageCreate, Client, MessageEmbed } = require("discord.js");
const Mutes = require("../../utils/database/models/mute");
const Bans = require("../../utils/database/models/ban");
const config = require("../../../configuration.json");

module.exports = class ReadyEvent extends BaseEvent {
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

        function getDate(){
            var now = new Date();
            var annee   = now.getFullYear();
            var mois    = now.getMonth() + 1;
            var jour    = now.getDate();
            var heure   = now.getHours();
            var minute  = now.getMinutes();
            return `${jour}/${mois}/${annee} à ${heure}:${minute}`
        }
        const updateList = async() => {
        let guild = await client.guilds.fetch('739495969778827306')
        const ls = new MessageEmbed()
        .setTitle("**Les services disponibles**") 
        .setDescription("Vous trouverez dans cette liste l'ensemble des services que nous pouvons vous proposer.")
        .setColor('#57d46e')
        .addFields(
            { name: '🪵 Développement de launchers Minecraft', value: `≻ ${guild.roles.cache.find(r => r.id === '812358666723917875').members.map(m=>m.user.username).join(' , ')}` },
            { name: '🪵 Développement de plugins Minecraft', value: `≻ ${guild.roles.cache.find(r => r.id === '808385305056641114').members.map(m=>m.user.username).join(' , ')}` },
            { name: '🪵 Développement de mods Minecraft', value: `≻ ${guild.roles.cache.find(r => r.id === '808385351684456508').members.map(m=>m.user.username).join(' , ')}` },
            { name: '🪵 Configuration de serveurs Minecraft', value: `≻ ${guild.roles.cache.find(r => r.id === '785542912619708426').members.map(m=>m.user.username).join(' , ')}` },
            { name: '🪵 Builders Minecraft', value: `≻ ${guild.roles.cache.find(r => r.id === '783021862162661437').members.map(m=>m.user.username).join(' , ')}` },
            { name: '⚙ Configuration de serveurs discord', value: `≻ ${guild.roles.cache.find(r => r.id === '1200801062572015677').members.map(m=>m.user.username).join(' , ')}`},
            { name: '⚙ Développement de bots discord', value: `≻ ${guild.roles.cache.find(r => r.id === '783021782239543358').members.map(m=>m.user.username).join(' , ')}`},
            { name: '💻 Développement Web', value: `≻ ${guild.roles.cache.find(r => r.id === '812360089125912646').members.map(m=>m.user.username).join(' , ')}` },
            { name: '💻 Développement Mobile', value: `≻ ${guild.roles.cache.find(r => r.id === '1066423278501118043').members.map(m=>m.user.username).join(' , ')}` },
            { name: '🖌 Web design', value: `≻ ${guild.roles.cache.find(r => r.id === '1065195159375061002').members.map(m=>m.user.username).join(' , ')}`},
            { name: '🪡 Modélisation', value: `≻ ${guild.roles.cache.find(r => r.id === '859183144942698496').members.map(m=>m.user.username).join(' , ')}`},
            { name: '🎨 Graphismes', value: `≻ ${guild.roles.cache.find(r => r.id === '783021916248080476').members.map(m=>m.user.username).join(' , ')}` },
            { name: '📃 Rédaction / Scenaristes', value: `≻ ${guild.roles.cache.find(r => r.id === '812654892585713684').members.map(m=>m.user.username).join(' , ')}` },
            { name: '🎬 Montage vidéo', value: `≻ ${guild.roles.cache.find(r => r.id === '787671866319962152').members.map(m=>m.user.username).join(' , ')}` },
            { name: '🔐 Administration système', value: `≻ ${guild.roles.cache.find(r => r.id === '871735381668823060').members.map(m=>m.user.username).join(' , ')}` },
            { name: '👮‍♂️ Configuraion FiveM', value: `≻ ${guild.roles.cache.find(r => r.id === '895372918899478608').members.map(m=>m.user.username).join(' , ')}` },
            { name: '👾 Configuration Palword ', value: `≻ ${guild.roles.cache.find(r => r.id === '1201567579421028363').members.map(m=>m.user.username).join(' , ')}` },


        )
        .setFooter({ text: `Dernière actualisation le : ${getDate()}`});

        var channel = client.guilds.cache.get("739495969778827306").channels.cache.get("1065208138778824777");
        channel.messages.fetch('1065208512025722890').then(msg => {
            msg.edit({ embeds: [ls] });
          });
          setTimeout(updateList, 72000000 );
        }
        updateList();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const findMuteAndBan = async() => {
    let mutedUsers = await Mutes.find();
        mutedUsers.forEach(async(mutedUser) => {
            let time = mutedUser.get("time");
            let guildID = mutedUser.get("guildId");
            let memberId = mutedUser.get("userId");
            let guild = await client.guilds.fetch(guildID)
            let member = await guild.members.fetch(memberId)
            let mutedRole = guild.roles.cache.find(r => r.id === '787720467032965120')
            if (mutedRole && Date.now() > time) {
                Mutes.findOneAndRemove({ userId: memberId }, 
                    function(err){
                        if(err){
                            console.log(err)
                        }
                    });
                member.roles.remove(mutedRole)
            }
        })
        let bannedUsers = await Bans.find();
        bannedUsers.forEach(async(bannedUser) => {
            let time = bannedUser.get("time");
            let guildID = bannedUser.get("guildId");
            let memberId = bannedUser.get("userId");
            let guild = await client.guilds.fetch(guildID)
            if (Date.now() > time) {
                Bans.findOneAndRemove({ userId: memberId }, 
                    function(err){
                        if(err){
                            console.log(err)
                        }
                    });
                guild.members.unban(memberId);
                var currentdate = new Date().toLocaleString('fr-FR');
                console.log(`Un débannissement à été effectué : ${currentdate} `);
            }
        })
    setTimeout(findMuteAndBan, 30000)
}
findMuteAndBan();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var currentdate = new Date().toLocaleString('fr-FR');
        console.log(client.user.tag + ` a démarré correctement à ${currentdate}`);
        const statusOptions = ['studycorp.fr', '.gg/87z7f6g', 'Bot by HybrideTV', '4.1/5 ⭐ Trustpilot']
        let counter = 0;
        const updateStatus =() => {
            client.user.setPresence({
                status: 'online',
                activities: [{name: statusOptions[counter]}]
            })
            if(++counter >= statusOptions.length){
                counter = 0;
            }
            setTimeout(updateStatus, 1000 * 30 * 10)
        }
        updateStatus();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}