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
        name: "ping",
        type: 1,
        description: "Get bot's latency"
    },
    run(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const pingEmbed = new discord_js_1.EmbedBuilder()
                .setColor("#9d8692")
                .setTitle(`Pong ${interaction.user.username}`)
                .setDescription(`**Pong:**: ${interaction.client.ws.ping}ms`)
                .setThumbnail(interaction.user.avatarURL())
                .setFooter({ text: `${interaction.user.username} asked the ping` })
                .setTimestamp();
            interaction.reply({ embeds: [pingEmbed] });
        });
    }
};
