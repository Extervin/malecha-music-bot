const { SlashCommandBuilder } = require('discord.js');
const { QueryType, useMainPlayer } = require('discord-player');

const spotify = require('@spotify/web-api-ts-sdk'); // Spotify API

// Если используешь Spotify API, добавь токены в .env
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || null;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || null;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Воспроизводит музыку из YouTube, Spotify и SoundCloud')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Название песни или ссылка')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: false });

            console.log('⏳ Запуск команды /play...');

            const player = useMainPlayer();
            let query = interaction.options.getString('query');
            const channel = interaction.member.voice.channel;

            if (!channel) {
                return interaction.followUp('❌ Ты должен быть в голосовом канале!');
            }

            console.log(`✅ Бот подключился к голосовому каналу: ${channel.name}`);

            let searchType = QueryType.AUTO;

            if (query.includes('spotify.com')) {
                try {
                    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
                        console.warn('⚠️ Spotify API не настроен. Используем стандартный поиск.');
                    } else {
                        const spotifyClient = spotify.SpotifyApi.withClientCredentials(
                            SPOTIFY_CLIENT_ID,
                            SPOTIFY_CLIENT_SECRET
                        );

                        const trackId = query.split('/track/')[1]?.split('?')[0];
                        if (!trackId) throw new Error('Неверный формат Spotify-ссылки');

                        const trackData = await spotifyClient.tracks.get(trackId);
                        query = `${trackData.artists[0].name} - ${trackData.name}`;
                        console.log(`🎵 Spotify-ссылка, найдено: ${query}`);
                    }
                } catch (error) {
                    console.error(`❌ Ошибка при обработке Spotify-ссылки: ${error.message}`);
                    return interaction.followUp('❌ Не удалось обработать Spotify-ссылку.');
                }
            } 

            console.log(`🔎 Ищем трек: ${query} (Тип: ${searchType})`);

            let searchResult = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: searchType
            });

            if (!searchResult.tracks.length) {
                console.log('❌ Ошибка: трек не найден.');
                return interaction.followUp('❌ Ничего не найдено!');
            }

            let track = searchResult.tracks[0];

            const queue = await player.nodes.create(interaction.guild, {
                metadata: interaction.channel,
                selfDeaf: true,
                leaveOnEnd: true
            });

            if (!queue.connection) {
                console.log('🔗 Подключение к голосовому каналу...');
                await queue.connect(channel);
            }

            console.log(`🎵 Добавляем в очередь: ${track.title}`);
            await queue.addTrack(track);

            if (!queue.node.isPlaying()) {
                await queue.node.play();
            }

            await interaction.followUp(`🎶 Сейчас играет: **${track.title}**`);
        } catch (error) {
            console.error(`❌ Ошибка воспроизведения: ${error.message}`);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.followUp('❌ Произошла ошибка при загрузке трека.');
            }
        }
    }
};
