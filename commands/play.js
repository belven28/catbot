const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const db = require('quick.db')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play with your pet to keep it entertained."),
    async execute(interaction) {
        let gotpet = db.get(`pet_${interaction.user.id}`)
        if(gotpet === true){
            let check = db.get(`happiness_${interaction.user.id}`)
            if(check === 1000){
                await interaction.reply({ content: "Your cat is too happy to play. Let it rest."})
            } else {
        let which = Math.floor(Math.random() * 5) + 1;
        if (which === 1){
        let embed = new EmbedBuilder()
        .setTitle(`"This thing is yummy isn't it?"`)
        .setColor('FF0000')
        .setDescription(`Your cat ate your addmath textbook and you told teacher that as if it's an excuse (MY CAT ATE MY HOMEWORK!!!). Your cat is happy and you're going to happily end it's life.`)
        
        
        db.add(`happiness_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.reply({ embeds: [embed] })
        } else if (which === 2){
            let embed = new EmbedBuilder()
            .setTitle(`Strings and Balls`)
            .setColor('#00FF00')
            .setDescription(`Your cat wrapped something with the strings. Oh, it's you. L`)

        db.add(`happiness_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.reply({ embeds: [embed] })
        } else if (which === 3){
            let embed = new EmbedBuilder()
            .setTitle(`You gave your cat an iPad`)
            .setColor('#0000FF')
            .setDescription(`Cat hates it and broke your $1000 iPad! At least your cat has a life, unlike you iPad kid. Well your cat had fun throwing iPads tho.`)

        db.add(`happiness_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.reply({ embeds: [embed] })
        } else if (which === 4){
            let embed = new EmbedBuilder()
            .setTitle(`Your cat is playing with another cat.`)
            .setColor('#FF0000')
            .setDescription(`Your cat's faught with the neighbor's cat ended up costing you $500 for the neighbor's cat's vet bill.`)

        db.add(`happiness_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.reply({ embeds: [embed] })
        } else if (which === 5){
            let embed = new EmbedBuilder()
            .setTitle(`Your cat is reading a book???`)
            .setColor('#00FF00')
            .setDescription(`Well cats read, what about you unemployed Discord user.`)

        db.add(`happiness_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.reply({ embeds: [embed] })
        }
    }
} else {
    await interaction.reply({ content: "You don't even have a pet!"})
}}
}