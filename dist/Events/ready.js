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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const chalk_1 = __importDefault(require("chalk"));
exports.event = {
    name: 'ready',
    exe: (client) => __awaiter(void 0, void 0, void 0, function* () {
        const commands = [];
        client.commands.forEach(cmd => {
            commands.push(cmd.payload);
        });
        console.log(commands);
        const rest = new rest_1.REST({ version: '9' }).setToken(client.environment.TOKEN);
        try {
            console.log(chalk_1.default.underline.cyan("Refresh application (/) command"));
            if (client.environment.MODE = "dev") {
                console.log(chalk_1.default.italic("We're in dev mode, be aware dragon could come here"));
                yield rest.put(v9_1.Routes.applicationGuildCommands(client.user.id, client.environment.GUILD_ID), { body: commands });
            }
            else {
                console.log(chalk_1.default.italic("We're in production mode, everything should be fine now"));
                yield rest.put(v9_1.Routes.applicationCommands(client.user.id), { body: commands });
            }
        }
        catch (e) {
            console.log(chalk_1.default.underline.italic.red(e.toString()));
        }
        client.user.setPresence({ activities: [{ name: "What are you doing step bro ?" }], status: "online" });
    })
};
