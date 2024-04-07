const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const db = require('quick.db')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("clean")
        .setDescription("Cleanse your pet to keep it clean and happy."),
    async execute(interaction) {
        let gotpet = db.get(`pet_${interaction.user.id}`)
        if(gotpet === true){
            let check = db.get(`cleanliness_${interaction.user.id}`)
            if(check === 1000){
                await interaction.reply({ content: "Your cat is cleaner than you. Stop showering it. 🙀"})
            } else {
        let wantto = Math.floor(Math.random() * 10) + 1;
        var respond = [
            "Your cat seems to enjoy showering and is currently clean.",
            "Your cat appears to relish showering and is presently clean.",
            "Your cat seems to take pleasure in showering and is currently enjoying a clean state.",
            "Your cat finds joy in showering and is currently maintaining a clean state.",
            "Your cat delights in showering and is presently enjoying cleanliness."
          ]
          
          var ranRespond = respond[Math.floor(Math.random() * respond.length)];
        if (wantto > 3){
            
        db.add(`cleanliness_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel(`Cleanliness and EXP increased`)
                .setDisabled(true)
                .setCustomId('c')
                .setStyle('Success')
            )
            await interaction.reply({ content: `${ranRespond}`, components: [row] })
        } else {
            const noShower = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("How can you fail such an easy task?")
                .setDisabled(true)
                .setCustomId('b')
                .setStyle('Danger')
                .setEmoji(`🤦`)
            )
        db.subtract(`cleanliness_${interaction.member.id}`, `${Math.floor(Math.random() * 100) + 35}`)
        
        await interaction.reply({ content: `Your cat is afraid of showers and doesn't want to bath.`, components: [noShower] })
        }
    }
}  else {
    await interaction.reply({ content: "You don't even have a pet!"})
}
    }
}