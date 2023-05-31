import { Event } from "../Interfaces";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { join } from "path";
import { readdirSync } from "fs";
import chalk from "chalk";

export const event: Event = {
    name: 'ready',
    exe: async ( client ) => {
        
        const commands = [];
        client.commands.forEach(cmd => {
            commands.push(cmd.payload);
        });

        console.log(commands);

        const rest = new REST({ version: '9' }).setToken(client.environment.TOKEN);

        try {
            console.log(chalk.underline.cyan("Refresh application (/) command"));

            if ( client.environment.MODE = "dev" ) {
                console.log(chalk.italic("We're in dev mode, be aware dragon could come here"));
                await rest.put(
                    Routes.applicationGuildCommands(client.user.id, client.environment.GUILD_ID),
                    { body: commands },
                );
            } else {
                console.log(chalk.italic("We're in production mode, everything should be fine now"));
                await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: commands },
                );
            }
        } catch (e) {
            console.log(chalk.underline.italic.red(e.toString()));
        }

        client.user.setPresence({ activities: [{ name: "What are you doing step bro ?" }], status: "online" });

    }
}
