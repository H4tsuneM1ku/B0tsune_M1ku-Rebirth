import { Interaction, codeBlock, EmbedBuilder } from "discord.js";
import { Event } from "../Interfaces";
import Client from "../Client";

export const event: Event = {
    name: 'interactionCreate',
    exe: async ( client: Client, interaction: Interaction ) => {
        if ( !interaction.isCommand() ) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.run(client, interaction);
        } catch (e) {
            if ( e ) {
                const error = new EmbedBuilder()

                    .setColor("#ff6961")
                    .setTitle("Error")
                    .setDescription("An error appeared : there is the troubleshoot")
                    .addFields({
                        name: "Error", value: codeBlock("js", e)
                    })
                    .setTimestamp()

                await interaction.reply({ embeds: [ error ]});
            }
        }
    }
}

