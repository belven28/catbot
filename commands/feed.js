const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const db = require('quick.db')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("feed")
        .setDescription("Feed your pet to keep it healthy."),
    async execute(interaction) {
        let gotpet = db.get(`pet_${interaction.user.id}`)
        if(gotpet === true){
            let check = db.get(`hunger_${interaction.user.id}`)
            if(check === 1000){
                await interaction.reply({ content: "Your cat is full. Stop feeding it. 🙀"})
            } else {
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Tuna')
                    .setEmoji(`🐟`)
                    .setCustomId("tuna")
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Salmon')
                    .setEmoji(`🐟`)
                    .setCustomId("salmon")
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Chicken')
                    .setEmoji(`🐔`)
                    .setCustomId("chicken")
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Egg')
                    .setEmoji(`🥚`)
                    .setCustomId("egg")
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Poop')
                    .setEmoji(`💩`)
                    .setCustomId("poop")
                    .setStyle('Primary'),
                )

                await interaction.reply({ content: "Choose something to feed your cat. 🐈", components: [row] })
            }
        } else {
            await interaction.reply({ content: "You don't even own a pet!"})
        }
    }
}