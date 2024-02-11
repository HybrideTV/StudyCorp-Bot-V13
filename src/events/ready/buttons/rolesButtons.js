const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  MessageCreate, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = class rolesButtons extends BaseEvent {
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
            let buttonMember = interaction.member;
            let guild = interaction.guild;
            if (interaction.customId === 'annoncebutton') {
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "803311722014179389");
                if(member.roles.cache.has('803311722014179389')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Notification annonce retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Notification annonce ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'newsbutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "824722261973794888");
                if(member.roles.cache.has('824722261973794888')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Notification nouveautés retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Notification nouveautés ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'partenariatbutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "809100807072907315");
                if(member.roles.cache.has('809100807072907315')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Notification partenariat retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Notification partenariat ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'gabutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "803311663658827816");
                if(member.roles.cache.has('803311663658827816')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Notification concours retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Notification concours ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'jeuxbutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "969540234343776296");
                if(member.roles.cache.has('969540234343776296')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Notification jeux retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Notification jeux ajouté', ephemeral: true });
                }
            }

            else if(interaction.customId === 'hommebutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "969541892083695657");
                if(member.roles.cache.has('969541892083695657')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Rôle homme retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Rôle homme ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'femmebutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "969541773317771285");
                if(member.roles.cache.has('969541773317771285')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Rôle femme retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Rôle femme ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'majeurbutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "969541957271576586");
                if(member.roles.cache.has('969541957271576586')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Rôle majeur retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Rôle majeur ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'mineurbutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "969542012627980339");
                if(member.roles.cache.has('969542012627980339')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Rôle mineur retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Rôle mineur ajouté', ephemeral: true });
                }
            }

            else if(interaction.customId === 'frbutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "1200815557105156146");
                if(member.roles.cache.has('1200815557105156146')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Rôle Français retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Rôle Français ajouté', ephemeral: true });
                }
            }else if(interaction.customId === 'enbutton'){
                let member = interaction.guild.members.cache.get(interaction.user.id);
                let role = guild.roles.cache.find(r => r.id === "1200815832859693277");
                if(member.roles.cache.has('1200815832859693277')){
                    buttonMember.roles.remove(role);
                    interaction.reply({ content: 'Rôle Anglais retiré', ephemeral: true });
                }else {
                    buttonMember.roles.add(role);
                    interaction.reply({ content: 'Rôle Anglais ajouté', ephemeral: true });
                }
            }
        })
    }
}