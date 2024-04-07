const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const db = require('quick.db')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("rename")
        .setDescription("Rename your pet."),
    async execute(interaction) {
        let catname = db.get(`catname_${interaction.user.id}`)
        if (!catname) {
            await interaction.reply({ content: `You don't even have a pet!` })
            return;
        }
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Rename')
            .setStyle('Primary')
            .setCustomId('rename')
            .setEmoji(`🏷️`),
            new ButtonBuilder()
            .setLabel('Nah I\'m good')
            .setStyle('Primary')
            .setCustomId('noRename')
            .setEmoji(`🐈`),
        )

        await interaction.reply({ content: `Your cat is currently named **${catname}**. Do you want to rename it?`, components: [row] })
    }
}