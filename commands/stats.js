const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const db = require('quick.db')

module.exports = {
  data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("View your pet's current statistics.")
        .addUserOption(option => option.setName('user').setDescription('The user that you want to check.')),
    async execute(interaction) {
        
        const member = interaction.options.getUser('user');
        if (!member){
        let gotpet = db.get(`pet_${interaction.user.id}`)
        if(gotpet === true){
        
        let hu = db.get(`hunger_${interaction.user.id}`)
        let c = db.get(`cleanliness_${interaction.user.id}`)
        let ha = db.get(`happiness_${interaction.user.id}`)

        if (hu > 1000){
            db.set(`hunger_${interaction.user.id}`, 1000)
        }
        if (c > 1000){
            db.set(`cleanliness_${interaction.user.id}`, 1000)
        }
        if (ha > 1000){
            db.set(`happiness_${interaction.user.id}`, 1000)
        }

        let hunger = db.get(`hunger_${interaction.user.id}`)
        let clean = db.get(`cleanliness_${interaction.user.id}`)
        let happy = db.get(`happiness_${interaction.user.id}`)
        
        const maxExp = 1000;
        const maxEmojis = 10;
        
        //hunger
        const currentExpHunger = hunger;
        const numGreenEmojisHunger = Math.floor((currentExpHunger / maxExp) * maxEmojis);
        const numGrayEmojisHunger = maxEmojis - numGreenEmojisHunger;

        const greenEmojiHunger = "🟩";
        const grayEmojiHunger = "⬛";

        const greenEmojisHunger = greenEmojiHunger.repeat(numGreenEmojisHunger);
        const grayEmojisHunger = grayEmojiHunger.repeat(numGrayEmojisHunger);

        const allEmojisHunger = greenEmojisHunger + grayEmojisHunger;

        //cleanliness
        const currentExpClean = clean;
        const numGreenEmojisClean = Math.floor((currentExpClean / maxExp) * maxEmojis);
        const numGrayEmojisClean = maxEmojis - numGreenEmojisClean;

        const greenEmojiClean = "🟩";
        const grayEmojiClean = "⬛";

        const greenEmojisClean = greenEmojiClean.repeat(numGreenEmojisClean);
        const grayEmojisClean = grayEmojiClean.repeat(numGrayEmojisClean);

        const allEmojisClean = greenEmojisClean + grayEmojisClean;

        //happiness
        const currentExpHappy = happy;
        const numGreenEmojisHappy = Math.floor((currentExpHappy / maxExp) * maxEmojis);
        const numGrayEmojisHappy = maxEmojis - numGreenEmojisHappy;

        const greenEmojiHappy = "🟩";
        const grayEmojiHappy = "⬛";

        const greenEmojisHappy = greenEmojiHappy.repeat(numGreenEmojisHappy);
        const grayEmojisHappy = grayEmojiHappy.repeat(numGrayEmojisHappy);

        const allEmojisHappy = greenEmojisHappy + grayEmojisHappy;

        const exp = db.get(`catexp_${interaction.member.id}`)

        let embed = new EmbedBuilder()
        .setTitle(`${db.get(`catname_${interaction.user.id}`)}'s Statistics (${interaction.user.username}'s Pet)`)
        .setColor("#00FFFF")
        .setFooter({
            text: "Bot made by belven28"
        })
        .setDescription(`Cat EXP: **${exp}** points\n\nHunger: **${hunger}** points\n${allEmojisHunger}\n\nCleanliness: **${clean}** points\n\n${allEmojisClean}\n\nHappiness: **${happy}** points\n\n${allEmojisHappy}\n\nAs time passes, your cat's hunger, cleanliness, and happiness may gradually diminish. \`/feed\`, \`/clean\` and \`/play\` to maintain it.`)
        await interaction.reply({ embeds: [embed] })
        } else {
            await interaction.reply({ content: 'You don\'t even own a pet!' })
        }
    } else {
        let gotpet = db.get(`pet_${member.id}`)
        if(gotpet === true){
        
        let hu = db.get(`hunger_${member.id}`)
        let c = db.get(`cleanliness_${member.id}`)
        let ha = db.get(`happiness_${member.id}`)

        if (hu > 1000){
            db.set(`hunger_${member.id}`, 1000)
        }
        if (c > 1000){
            db.set(`cleanliness_${member.id}`, 1000)
        }
        if (ha > 1000){
            db.set(`happiness_${member.id}`, 1000)
        }

        let hunger = db.get(`hunger_${member.id}`)
        let clean = db.get(`cleanliness_${member.id}`)
        let happy = db.get(`happiness_${member.id}`)
        
        const maxExp = 1000;
        const maxEmojis = 10;
        
        //hunger
        const currentExpHunger = hunger;
        const numGreenEmojisHunger = Math.floor((currentExpHunger / maxExp) * maxEmojis);
        const numGrayEmojisHunger = maxEmojis - numGreenEmojisHunger;

        const greenEmojiHunger = "🟩";
        const grayEmojiHunger = "⬛";

        const greenEmojisHunger = greenEmojiHunger.repeat(numGreenEmojisHunger);
        const grayEmojisHunger = grayEmojiHunger.repeat(numGrayEmojisHunger);

        const allEmojisHunger = greenEmojisHunger + grayEmojisHunger;

        //cleanliness
        const currentExpClean = clean;
        const numGreenEmojisClean = Math.floor((currentExpClean / maxExp) * maxEmojis);
        const numGrayEmojisClean = maxEmojis - numGreenEmojisClean;

        const greenEmojiClean = "🟩";
        const grayEmojiClean = "⬛";

        const greenEmojisClean = greenEmojiClean.repeat(numGreenEmojisClean);
        const grayEmojisClean = grayEmojiClean.repeat(numGrayEmojisClean);

        const allEmojisClean = greenEmojisClean + grayEmojisClean;

        //happiness
        const currentExpHappy = happy;
        const numGreenEmojisHappy = Math.floor((currentExpHappy / maxExp) * maxEmojis);
        const numGrayEmojisHappy = maxEmojis - numGreenEmojisHappy;

        const greenEmojiHappy = "🟩";
        const grayEmojiHappy = "⬛";

        const greenEmojisHappy = greenEmojiHappy.repeat(numGreenEmojisHappy);
        const grayEmojisHappy = grayEmojiHappy.repeat(numGrayEmojisHappy);

        const allEmojisHappy = greenEmojisHappy + grayEmojisHappy;

        const exp = db.get(`catexp_${member.id}`)

        let embed = new EmbedBuilder()
        .setTitle(`${db.get(`catname_${member.id}`)}'s Statistics (${member.username}'s Pet)`)
        .setColor("#00FFFF")
        .setFooter({
            text: "Bot made by belven28"
        })
        .setDescription(`Cat EXP: **${exp}** points\n\nHunger: **${hunger}** points\n${allEmojisHunger}\n\nCleanliness: **${clean}** points\n\n${allEmojisClean}\n\nHappiness: **${happy}** points\n\n${allEmojisHappy}\n\nAs time passes, your cat's hunger, cleanliness, and happiness may gradually diminish. \`/feed\`, \`/clean\` and \`/play\` to maintain it.`)
        await interaction.reply({ embeds: [embed] })
        } else {
            await interaction.reply({ content: 'The provided user doesn\'t even have a pet!' })
        }
    }
    }
}