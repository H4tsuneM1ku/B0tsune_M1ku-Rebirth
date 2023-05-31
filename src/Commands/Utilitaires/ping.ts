import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
    categorie: "Utilitaires",
    payload: {
        name: "ping",
        type: 1,
        description: "Get bot's latency"
    },
    async run( client, interaction ) {

        const pingEmbed = new EmbedBuilder()
            .setColor("#9d8692")
            .setTitle(`Pong ${interaction.user.username}`)
            .setDescription(`**Pong:**: ${interaction.client.ws.ping}ms`)
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: `${interaction.user.username} asked the ping`})
            .setTimestamp()

        interaction.reply({ embeds: [ pingEmbed ]});
    }
}
