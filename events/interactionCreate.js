module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, interaction.client);
        } catch (error) {
            console.error(`❌ Ошибка выполнения команды: ${error.message}`);
            await interaction.reply({ content: '❌ Ошибка выполнения команды.', ephemeral: true });
        }
    }
};
