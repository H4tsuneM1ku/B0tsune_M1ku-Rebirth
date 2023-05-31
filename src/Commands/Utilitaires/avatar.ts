import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
    categorie: "Utilitaires",
    payload: {
        name: "Avatar",
        type: 2,
    },
        async run(client, interaction) {
            const member = await interaction.guild.members.fetch(interaction.targetId);
            const userinfoEmbed = new EmbedBuilder()
                .setAuthor({ name: `${member.user.tag}`})
                .setImage(member.user.displayAvatarURL({size: 2048}))
                .setColor('#ea7777')
	.setTimestamp();
	interaction.reply({ embeds: [userinfoEmbed]});
	},
};