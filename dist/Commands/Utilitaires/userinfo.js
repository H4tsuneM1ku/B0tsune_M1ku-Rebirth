"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    categorie: "Utilitaires",
    payload: {
        name: "Infos Utilisateur",
        type: 2,
    },
    run(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.targetMember;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let rolemap = member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" ");
            if (rolemap.length > 1024)
                rolemap = "`L'utilisateur a beaucoup trop de rôles pour tous les montrer!`";
            if (!rolemap)
                rolemap = "`L'utilisateur n'a aucun rôle!`";
            let status = {
                "online": 'En ligne',
                "idle": 'Inactif',
                "dnd": 'Ne pas déranger',
                "offline": 'Hors ligne/Invisible'
            };
            let t;
            if (member.presence == null) {
                t = "offline";
            }
            else
                t = member.presence.status;
            let status2 = {
                "true": '<:success:849659901881483285>',
                "false": '<:error:849659902049124363>'
            };
            let b = member.user.bot.toString();
            let Off = (b == "true") ? status2[b] : status2["false"];
            let statusEmoji = {
                "online": '<:online:849659901973495839>',
                "idle": '<:idle:849659902238654543>',
                "dnd": '<:dnd:849659902317690910>',
                "offline": '<:offline:849659902652973146>'
            };
            const userinfoEmbed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}` })
                .setThumbnail(member.user.displayAvatarURL({ size: 2048 }))
                .setColor('#ea7777')
                .addFields({ name: '📛 Nom', value: "`" + `${member.user.username}` + "`", inline: true }, { name: '🆔 ID', value: "`" + `${member.user.id}` + "`", inline: true }, { name: '✍️ Pseudo', value: "`" + `${member.nickname || "Aucun pseudo"}` + "`", inline: true }, { name: '<:bot:849659902464229467> Bot', value: `${Off}`, inline: true }, { name: '<:id:849659902153588806> Créé le', value: `<t:` + `${Math.floor(member.user.createdTimestamp / 1000)}` + `:R>`, inline: true }, { name: '<:users:849659902002987009> Rejoins le', value: `<t:` + `${Math.floor(member.joinedTimestamp / 1000)}` + `:R>`, inline: true }, { name: `${statusEmoji[t]} Status`, value: "`" + `${status[t]}` + "`", inline: true }, { name: '🎧 Salon vocal', value: `${member.voice.channel || "`N'est pas dans un canal vocal`"}`, inline: true }, { name: '<:roles:849659901973495879>' + ' Roles', value: rolemap, inline: true })
                .setTimestamp();
            interaction.reply({ embeds: [userinfoEmbed] });
        });
    },
};
