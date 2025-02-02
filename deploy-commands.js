const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if (!command.data) {
        console.warn(`⚠️ Команда ${file} не имеет свойства "data"`);
        continue;
    }

    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('🔄 Загружаем Slash-команды...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('✅ Slash-команды загружены!');
    } catch (error) {
        console.error(`❌ Ошибка загрузки команд: ${error.message}`);
    }
})();
