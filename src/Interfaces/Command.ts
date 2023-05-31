import { CommandInteraction, UserContextMenuCommandInteraction, ChatInputCommandInteraction } from "discord.js";
import Client from "../Client";

interface Run {
    ( client: Client, interaction: any )
};

export interface Command {
    categorie: string,
    payload: {
        name: string,
        type?: number,
        description?: string;
        options?: Array<{
            name: string,
            description: string,
            type: number,
            required?: boolean,
            options?: any,
            choices?: Array<{
                name: string,
                value: string | number
            }>,
            autocomplete?: boolean
        }>,
    },
    run: Run,
}
