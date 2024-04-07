const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const db = require('quick.db')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("adopt")
        .setDescription("Adopt a virtual cat."),
    async execute(interaction) {
        let gotpet = db.get(`pet_${interaction.user.id}`)
        let petname = db.get(`catname_${interaction.user.id}`)

        if (gotpet === true){
            await interaction.reply({ content: `You currently have a pet, so you can't adopt another one simultaneously. **${petname}** would feel despondent if you were to give them up. 😿\n\n\`/disown\` to disown your cat. Though you don't really wanna do that...` })
        } else {
            let embed = new EmbedBuilder()
            .setTitle(`You picked a cat!`)
            .setColor('#00FFFF')
            .setDescription(`Please select a name for your feline friend to adopt it. If you prefer not to, you can click \`Done\`, and your cat will be named "Cat".\n\n**Using an unsuitable name will lead to a bot ban.**`)
            
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Name It')
                .setStyle('Primary')
                .setCustomId('namecatButton')
                .setEmoji('🏷️'),
                new ButtonBuilder()
                .setLabel('Done')
                .setCustomId('doneButton')
                .setStyle('Secondary')
                .setEmoji(`✅`)
            )

            await interaction.reply({ embeds: [embed], components: [row] })
        }
    }
}