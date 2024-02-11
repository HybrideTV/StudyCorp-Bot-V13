const { MessageEmbed, GuildMember, MessageAttachment } = require("discord.js");
const BaseEvent = require("../../utils/structures/BaseEvent");
const config = require("../../../configuration.json");
const bankDb = require("../../utils/database/models/bank");
const moment = require("moment");
const Canvas = require("canvas");

module.exports = class GuildMemberWelcomeEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client, member) {

    var dateFormat = new Date(member.user.createdTimestamp);
    const memberAdd = new MessageEmbed()
    
      .setTitle("Nouveau membre")
      .setTimestamp()
      .setDescription(member.user.username)
      .setColor(0x1ffe00)
      .addFields( 
        { name: "ID de l'utilisateur", value: `${member.user.id}` , inline: true },
        { name: "Compte créé le", value: `${dateFormat}`, inline: true  },
    )
    member.guild.channels.cache
      .get(`${config.channel_logs}`)
      .send({ embeds: [memberAdd] });

    let createUser = new bankDb({
      userId: member.user.id,
      money: 0,
    });
    createUser.save().catch((err) => console.log(err));
  
    var canvas = Canvas.createCanvas(1024, 400);
    var ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./src/images/background.jpg");
    ctx.drawImage(background, 0, 0, 1024, 400);
    ctx.font = "85px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Bienvenue", 650, 190);
    ctx.fillText(member.user.username, 650, 250);
    ctx.beginPath();
    ctx.arc(200, 200, 125, 0, Math.PI * 2, false);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.save();
    ctx.closePath();
    ctx.clip();
    var avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: "jpg",
      })
    );
    ctx.drawImage(avatar, 75, 75, 250, 250);

    var attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png");
    member.guild.channels.cache
      .get("739501609284927559")
      .send({ files: [attachment] });
    var userCount = member.guild.memberCount;

    const welcomeMpEmbed = new MessageEmbed()
      .setTitle("Bienvenue sur StudyCorp !")
      .setColor(0x01ff00)
      .setDescription(
        "Pense à lire le règlement pour éviter des sanctions !\nNotre équipe de modération se porte à votre service pour toute question."
      )
      .addField(
        "\nTu n'as pas trouvé ce que tu cherchais ? Fait nous part de tes remarques ici :",
        "https://forms.gle/q1da8ZJE4jaN1ZQDA"
      );
    member.send({ embeds: [welcomeMpEmbed] }).catch((error) => {
      console.log(
        "Erreur lors de l'envoi du message privé. Le membre n'accepte pas ses MP"
      );
    });
  }
};
