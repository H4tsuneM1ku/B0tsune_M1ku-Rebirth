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
exports.event = void 0;
const discord_js_1 = require("discord.js");
exports.event = {
    name: 'interactionCreate',
    exe: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isCommand())
            return;
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            yield command.run(client, interaction);
        }
        catch (e) {
            if (e) {
                const error = new discord_js_1.EmbedBuilder()
                    .setColor("#ff6961")
                    .setTitle("Error")
                    .setDescription("An error appeared : there is the troubleshoot")
                    .addFields({
                    name: "Error", value: (0, discord_js_1.codeBlock)("js", e)
                })
                    .setTimestamp();
                yield interaction.reply({ embeds: [error] });
            }
        }
    })
};
