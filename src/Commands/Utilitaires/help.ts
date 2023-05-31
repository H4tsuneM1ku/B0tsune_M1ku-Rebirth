import { Command } from "../../Interfaces";
import { EmbedBuilder, inlineCode } from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";

export const command: Command = {
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
            }],
    },
    async run ( client, interaction ) {
        
        const command = interaction.options.get("command", false);
        const file = readdirSync(join(__dirname, "../../Commands"));

        if ( !command ) {
            const Helpembed = new EmbedBuilder()

                .setColor("#9d8692")
                .setTitle(`There is the commands ${interaction.user.username}`)
                .setTimestamp()
                .setFooter({ text: "Someone asked the commands" })
    
            for ( const cats of file ) {
                Helpembed.addFields({
                    name: cats,
                    value: inlineCode(client.commands.filter(cat => cat.categorie === cats).map(cmd => cmd.payload.name).join(", "))
                });
            }

            interaction.reply({ embeds: [ Helpembed ]});
        } else {
            const ptr = client.commands.get(command.value.toString());
            
            if ( ptr ) {
                const Helpembed = new EmbedBuilder()

                    .setTitle(`Detail of ${ptr.payload.name}`)
                    .setColor("#9d8692")
                    .setDescription(ptr.payload.description)
                    .setTimestamp()
                    .setFooter({ text: `${interaction.user.username} asked futher information about a command` })

                if ( ptr.payload.options ) {
                
                    ptr.payload.options.forEach(opt => {
                        Helpembed.addFields({
                            name: opt.name,
                            value: opt.description,
                        });
                    });

                }

                interaction.reply({ embeds: [ Helpembed ]});

            }
        }

    }
}
