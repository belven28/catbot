const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get help and information about using the bot."),
    async execute(interaction) {
        let embed = new EmbedBuilder()
        .setTitle(`Help Panel`)
        .setColor('#00ffff')
        .setFooter({
            text: "Bot made by belven28"
        })
        .setDescription("`/adopt` => Adopt a virtual pet.\n`/clean` => Cleanse your pet to keep it clean and happy.\n`/disown` => Disown your pet.\n`/feed` => Feed your pet to keep it healthy.\n`/help` => Get help and information about using the bot.\n`/play` => Play with your pet to keep it entertained.\n`/rename` => Rename your pet.\n`/stats` => View your pet's current statistics.")
        await interaction.reply({ embeds: [embed] })
    }
}