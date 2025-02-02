const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Останавливает воспроизведение и очищает очередь'),
    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild);

        if (!queue || !queue.node.isPlaying()) {
            return interaction.reply('❌ Сейчас ничего не играет.');
        }

        queue.delete();
        return interaction.reply('⏹ Воспроизведение остановлено.');
    }
};
