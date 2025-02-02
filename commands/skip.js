const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Пропускает текущий трек'),
    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.node.isPlaying()) {
            return interaction.reply('❌ Сейчас ничего не играет.');
        }

        queue.node.skip();
        return interaction.reply('⏭ Трек пропущен.');
    }
};
