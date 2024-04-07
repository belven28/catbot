const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
        .setName("disown")
        .setDescription("Disown your pet."),
    async execute(interaction) {
        let gotpet = db.get(`pet_${interaction.user.id}`)
        if(gotpet === true){
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Nah lemme think about it')
            .setCustomId('noDisown')
            .setStyle('Success')
            .setEmoji(`😽`),
            new ButtonBuilder()
            .setLabel('Confirm')
            .setCustomId('confirmDisown')
            .setStyle('Danger')
            .setEmoji(`😿`)
        )
        
        await interaction.reply({ content: "Are you certain you wish to disown your cat? Resetting your progress will be unavoidable if you proceed.", components: [row] })
    }  else {
    await interaction.reply({ content: "You don't even have a pet!"})
}
    }
}