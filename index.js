const { Modal, ModalBuilder, Collection, PermissionsBitField, Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, TextInputBuilder, Events, TextInputStyle } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});
const http = require('http');
const path = require('node:path')
const fs = require('node:fs')
const db = require('quick.db')

http.createServer(function (req, res) {
  res.write("online");
  res.end();
}).listen(8080);

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
    console.log('Bot is online.')
    client.user.setActivity('/adopt')
    let allUsers = []

//send global message
/*client.guilds.cache.forEach(guild => {
  guild.members.cache.forEach(member => {
    member.send({ content: "testing, please ignore" })
  })
})*/
    setInterval(() => {
        client.guilds.cache.forEach(guild => {
            guild.members.cache.forEach(member => {
            let check1 = db.get(`hunger_${member.id}`)
            let check2 = db.get(`cleanliness_${member.id}`)
            let check3 = db.get(`happiness_${member.id}`)

            if (check1 > 15) {
              db.subtract(`hunger_${member.id}`, `${Math.floor(Math.random() * 10) + 1}`)
            }
            if (check2 > 15) {
              db.subtract(`cleanliness_${member.id}`, `${Math.floor(Math.random() * 10) + 1}`)
            }
            if (check3 > 15) {
              db.subtract(`happiness_${member.id}`, `${Math.floor(Math.random() * 10) + 1}`)
            }
            })
          })
    }, 90000)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)){
        interaction.reply({ content: "I'm missing `embed links` permission." })
      return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        const server = interaction.guild;

        const member = await server.members.fetch(interaction.user)

        await command.execute (interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    var feedRespond = [
        "Your cat is happily munching away, feeling fuller with each bite and becoming increasingly satisfied.",
        "Your cat is joyfully eating, becoming fuller with each bite and feeling increasingly content.",
        "Your cat savors each bite, filling up with every mouthful, and experiencing growing satisfaction.",
        "Your cat relishes each mouthful, filling up gradually, and experiencing a sense of increasing satisfaction.",
        "Your cat indulges in each bite, slowly becoming satisfied and content with each passing moment."
      ]
      
      var randomFeedRespond = feedRespond[Math.floor(Math.random() * feedRespond.length)];
      
      const feedEndPoop = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Tuna')
                    .setEmoji(`🐟`)
                    .setDisabled(true)
                    .setCustomId("tuna")
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Salmon')
                    .setDisabled(true)
                    .setEmoji(`🐟`)
                    .setCustomId("salmon")
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Chicken')
                    .setEmoji(`🐔`)
                    .setDisabled(true)
                    .setCustomId("chicken")
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Egg')
                    .setEmoji(`🥚`)
                    .setCustomId("egg")
                    .setDisabled(true)
                    .setStyle('Primary'),
                    new ButtonBuilder()
                    .setLabel('Poop')
                    .setEmoji(`💩`)
                    .setDisabled(true)
                    .setCustomId("poop")
                    .setStyle('Success'),
                )
    
    const noEat = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel("You failed to feed a cat? No way")
        .setDisabled(true)
        .setCustomId('a')
        .setStyle('Danger')
        .setEmoji(`🤦`)
    )

    const eatS = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel(`Hunger and EXP increased`)
                .setDisabled(true)
                .setCustomId('d')
                .setStyle('Success')
            )
    
    if (interaction.customId === "namecatButton"){
        const modal = new ModalBuilder()
			.setCustomId('catname')
			.setTitle('Cat Details');

		// Add components to modal

		// Create the text input components
		const nameInput = new TextInputBuilder()
			.setCustomId('nameinput')
            .setPlaceholder("Meow~")
            .setRequired(true)
            .setMinLength(2)
            .setMaxLength(20)
		    // The label is the prompt the user sees for this input
			.setLabel("Name for your new cat?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(nameInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
    } else if (interaction.customId === "doneButton"){
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Name It')
                .setStyle('Primary')
                .setDisabled(true)
                .setCustomId('namecatButton')
                .setEmoji('🏷️'),
                new ButtonBuilder()
                .setLabel('Done')
                .setDisabled(true)
                .setCustomId('doneButton')
                .setStyle('Secondary')
                .setEmoji(`✅`)
            )

        db.set(`catname_${interaction.user.id}`, `Cat`)
        db.set(`pet_${interaction.user.id}`, true)

        const embed = new EmbedBuilder()
        .setTitle(`Welcome Home, Furry Friend: Celebrating Your New Adoption!`)
        .setDescription(`You successfully adopted a cat! Remember to care for your cat by **feeding**, **playing**, and **cleaning** regularly to maintain their well-being and happiness!`)
        .setColor("#00FFFF")
        .setFooter({
            text: "Bot made by belven28"
        })
        .setTimestamp()
        
        db.set(`hunger_${interaction.member.id}`, 750)
        db.set(`cleanliness_${interaction.member.id}`, 750)
        db.set(`happiness_${interaction.member.id}`, 750)
        db.set(`catexp_${interaction.member.id}`, 0)
        await interaction.update({ embeds: [embed], components: [row] })
    } else if (interaction.customId === "confirmDisown"){
        db.set(`pet_${interaction.user.id}`, false)
        db.set(`catname_${interaction.user.id}`, null)
        
        db.set(`hunger_${interaction.member.id}`, 0)
        db.set(`cleanliness_${interaction.member.id}`, 0)
        db.set(`happiness_${interaction.member.id}`, 0)
        db.set(`catexp_${interaction.member.id}`, 0)
        await interaction.update({ content: "You have chosen to disown your cat. We look forward to seeing you again soon!", components: [] })
    } else if (interaction.customId === "noDisown"){
        await interaction.update({ content: "Let's carry on as if nothing occurred.", components: []})
    } else if (interaction.customId === "rename"){
        const modal = new ModalBuilder()
			.setCustomId('renamecatModal')
			.setTitle('Rename Cat');

		// Add components to modal
        let catname = db.get(`catname_${interaction.user.id}`)
		// Create the text input components
		const nameInput = new TextInputBuilder()
			.setCustomId('nameinputRename')
            .setPlaceholder(`Your cat is currently named ${catname}.`)
            .setRequired(true)
            .setMinLength(2)
            .setMaxLength(20)
		    // The label is the prompt the user sees for this input
			.setLabel("New name for your cat?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(nameInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
    } else if (interaction.customId === "noRename"){
        await interaction.update({ content: "Let's carry on as if nothing occurred.", components: []})
    } else if (interaction.customId === "tuna"){
        if(((Math.random() * 10) + 1) > 2){
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        db.add(`hunger_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        await interaction.update({ content: `${randomFeedRespond} `, components: [eatS] })
        } else {
            await interaction.update({ components: [noEat], content: `Your cat seems uninterested in eating right now. Maybe later?`})
        }
    } else if (interaction.customId === "salmon"){
        if(((Math.random() * 10) + 1) > 3){
        db.add(`hunger_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.update({ content: `${randomFeedRespond} `, components: [eatS]})
    } else {
        await interaction.update({ components: [noEat], content: `Your cat seems uninterested in eating right now. Maybe later?`})
    }
    } else if (interaction.customId === "chicken"){
        if(((Math.random() * 10) + 1) > 3){
        db.add(`hunger_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.update({ content: `${randomFeedRespond} `, components: [eatS]})
    } else {
        await interaction.update({ components: [noEat], content: `Your cat seems uninterested in eating right now. Maybe later?`})
    }
    } else if (interaction.customId === "egg"){
        if(((Math.random() * 10) + 1) > 3){
        db.add(`hunger_${interaction.member.id}`, `${Math.floor(Math.random() * 150) + 50}`)
        db.add(`catexp_${interaction.member.id}`, `${Math.floor(Math.random() * 500) + 300}`)
        await interaction.update({ content: `${randomFeedRespond} `, components: [eatS]})
    } else {
        await interaction.update({ components: [noEat], content: `Your cat seems uninterested in eating right now. Maybe later?`})
    }
    } else if (interaction.customId === "poop"){
        if(((Math.random() * 10) + 1) > 3){
        let check1 = db.get(`hunger_${interaction.member.id}`)

            if (check1 > 15) {
              db.subtract(`hunger_${interaction.member.id}`, `${Math.floor(Math.random() * 100) + 35}`)
            }
        await interaction.update({ components: [feedEndPoop], content: `"Why on earth would you even think about feeding your cat something like that?"`})
    }
}
})

client.on("interactionCreate", async interaction => {
	if (!interaction.isModalSubmit()) return;

	if (interaction.customId === 'catname') {
        const catname = interaction.fields.getTextInputValue('nameinput');

        db.set(`catname_${interaction.user.id}`, `${catname}`)
        db.set(`pet_${interaction.user.id}`, true)

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Name It')
                .setStyle('Primary')
                .setDisabled(true)
                .setCustomId('namecatButton')
                .setEmoji('🏷️'),
                new ButtonBuilder()
                .setLabel('Done')
                .setDisabled(true)
                .setCustomId('doneButton')
                .setStyle('Secondary')
                .setEmoji(`✅`)
            )
            
		const embed = new EmbedBuilder()
        .setTitle(`Welcome Home, Furry Friend: Celebrating Your New Adoption!`)
        .setDescription(`You successfully adopted and named your cat **${catname}**! You can change your cat's name at any time using the command \`/rename\`.\n\nRemember to care for your cat by **feeding**, **playing**, and **cleaning** regularly to maintain their well-being and happiness!`)
        .setColor("#00FFFF")
        .setFooter({
            text: "Bot made by belven28"
        })
        .setTimestamp()

        db.set(`hunger_${interaction.member.id}`, 750)
        db.set(`cleanliness_${interaction.member.id}`, 750)
        db.set(`happiness_${interaction.member.id}`, 750)
        db.set(`catexp_${interaction.member.id}`, 0)
        await interaction.update({ embeds: [embed], components: [row] })
	} else if (interaction.customId === 'renamecatModal') {
        const catname = interaction.fields.getTextInputValue('nameinputRename');

        db.set(`catname_${interaction.user.id}`, `${catname}`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Rename')
            .setStyle('Primary')
            .setCustomId('rename')
            .setDisabled(true)
            .setEmoji(`🏷️`),
            new ButtonBuilder()
            .setLabel('Nah I\'m good')
            .setStyle('Primary')
            .setCustomId('noRename')
            .setDisabled(true)
            .setEmoji(`🐈`),
        )
        await interaction.update({ content: `Your new cat shall be known as **${catname}** from now on.`, components: [row] })
	} 
});

client.login("MTE0MzE1ODgyODcyMDk5NjM3NA.GszE68.erjak5CRZKcMlx0WmJ4PMvlQ-rK5Lyu0wSyK9I")