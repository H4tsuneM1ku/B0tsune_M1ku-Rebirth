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
const path_1 = require("path");
const fs_1 = require("fs");
exports.command = {
    categorie: "Utilitaires",
    payload: {
        name: "help",
        type: 1,
        description: "Une commande pour les gouverner tous",
        options: [
            {
                name: "commande",
                type: 3,
                description: "Le nom de la commande",
                required: false
            }
        ],
    },
    run(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = interaction.options.get("command", false);
            const file = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, "../../Commands"));
            if (!command) {
                const Helpembed = new discord_js_1.EmbedBuilder()
                    .setColor("#9d8692")
                    .setTitle(`There is the commands ${interaction.user.username}`)
                    .setTimestamp()
                    .setFooter({ text: "Someone asked the commands" });
                for (const cats of file) {
                    Helpembed.addFields({
                        name: cats,
                        value: (0, discord_js_1.inlineCode)(client.commands.filter(cat => cat.categorie === cats).map(cmd => cmd.payload.name).join(", "))
                    });
                }
                interaction.reply({ embeds: [Helpembed] });
            }
            else {
                const ptr = client.commands.get(command.value.toString());
                if (ptr) {
                    const Helpembed = new discord_js_1.EmbedBuilder()
                        .setTitle(`Detail of ${ptr.payload.name}`)
                        .setColor("#9d8692")
                        .setDescription(ptr.payload.description)
                        .setTimestamp()
                        .setFooter({ text: `${interaction.user.username} asked futher information about a command` });
                    if (ptr.payload.options) {
                        ptr.payload.options.forEach(opt => {
                            Helpembed.addFields({
                                name: opt.name,
                                value: opt.description,
                            });
                        });
                    }
                    interaction.reply({ embeds: [Helpembed] });
                }
            }
        });
    }
};
