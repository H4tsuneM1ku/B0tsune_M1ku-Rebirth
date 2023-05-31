import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Config, Event, Command } from "../Interfaces";
import chalk from "chalk";
import config  from "../environments.config";

export default class ExtendedClient extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public environment: Config = config;

    public async init() {       
        this.login(this.environment.TOKEN as string);

        const baseCommandPath = join(__dirname, "..", "Commands");

        readdirSync(baseCommandPath).forEach(dir => {
            const files = readdirSync(`${baseCommandPath}/${dir}`).filter(file => file.endsWith("js"));

            for ( const file of files ) {
                const { command } = require(`${baseCommandPath}/${dir}/${file}`);
                this.commands.set(command.payload.name, command);
                console.log(chalk.bold.green(`Loaded Command: ${command.payload.name}`));
            }
        });

        const baseEventPath = join(__dirname, "..", "Events");
        readdirSync(baseEventPath).forEach(async file => {
            const { event } = await import(`${baseEventPath}/${file}`);
            this.events.set(event.name, event);
            console.log(chalk.bold.magenta(`Listened Event: ${event.name}`));
            this.on(event.name, event.exe.bind(null, this));
        });
    }

}
