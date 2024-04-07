const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');

const commands = [
  new SlashCommandBuilder().setName('adopt').setDescription('Adopt a virtual pet.'),
  new SlashCommandBuilder().setName('clean').setDescription('Cleanse your pet to keep it clean and happy.'),
  new SlashCommandBuilder().setName('disown').setDescription('Disown your pet.'),
  new SlashCommandBuilder().setName('feed').setDescription('Feed your pet to keep it healthy.'),
  new SlashCommandBuilder().setName('help').setDescription('Get help and information about using the bot.'),
  new SlashCommandBuilder().setName('play').setDescription('Play with your pet to keep it entertained.'),
  new SlashCommandBuilder().setName('rename').setDescription('Rename your pet.'),
  new SlashCommandBuilder().setName('stats').setDescription('View your pet\'s current statistics.').addUserOption(option => option.setName('user').setDescription('The user that you want to check.')),
    ]
    .map(command => command.toJSON());

const rest = new REST({
    version: '9'
}).setToken("MTE0MzE1ODgyODcyMDk5NjM3NA.GszE68.erjak5CRZKcMlx0WmJ4PMvlQ-rK5Lyu0wSyK9I");

rest.put(Routes.applicationCommands("1143158828720996374"), {
        body: commands
    })
    .then(() => console.log('Successfully registered application commands.'))

.catch(console.error);