require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if (!command.data || !command.data.name) {
        console.warn(`⚠️ Команда ${file} не имеет корректного "data.name"`);
        continue;
    }

    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

const player = new Player(client);

(async () => {
    await player.extractors.loadMulti(DefaultExtractors);
})();

client.player = player;

// 📌 Добавляем обработчик ошибок
player.events.on('playerError', (queue, error) => {
    console.error(`❌ Ошибка воспроизведения: ${error.message}`);

    if (queue && queue.metadata) {
        queue.metadata.send(`❌ Произошла ошибка: ${error.message}`);
    }
});

player.events.on('error', (queue, error) => {
    console.error(`❌ Общая ошибка плеера: ${error.message}`);

    if (queue && queue.metadata) {
        queue.metadata.send(`❌ Ошибка: ${error.message}`);
    }
});

client.once('ready', () => {
    console.log(`✅ Бот ${client.user.tag} запущен!`);
});

client.login(process.env.DISCORD_TOKEN);
