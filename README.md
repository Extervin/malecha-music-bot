# Discord Music Bot

A powerful and optimized music bot for Discord using `discord.js` and `discord-player`. Supports YouTube, Spotify, and SoundCloud playback.

## 🚀 Features
- **🎵 Plays music from YouTube, Spotify, and SoundCloud**
- **🔗 Supports direct links and text-based search**
- **📜 Automatically fetches song titles from links**
- **📃 Supports playlists and queues**
- **🎚️ Volume control, skipping, and stop commands**

---

## 📦 Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Extervin/malecha-music-bot
cd malecha-music-bot
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Create a `.env` file and add the following:
```
DISCORD_TOKEN=your_discord_bot_token
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

🔹 **How to get Spotify credentials?**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in and create an app
3. Copy `Client ID` and `Client Secret`
4. Paste them into the `.env` file

### 4️⃣ Run the bot
```sh
node index.js
```

---

## 🎮 Commands
| Command | Description |
|---------|-------------|
| `/play [query/link]` | Plays a song from YouTube, Spotify, or SoundCloud |
| `/skip` | Skips the current song |
| `/stop` | Stops playback and clears the queue |
| `/queue` | Shows the current playlist |
| `/pause` | Pauses the music |
| `/resume` | Resumes playback |

---

## 🎶 How It Works
- If a **YouTube link** is provided, the bot extracts the **video title** and searches for it.
- If a **Spotify link** is provided, it fetches the **track name and artist** and searches for it.
- If a **SoundCloud link** is provided, it plays the track directly.
- **Text queries** are searched using YouTube as the default.

---

## 🛠 Dependencies
- [`discord.js`](https://discord.js.org/)
- [`discord-player`](https://discord-player.js.org/)
- [`ytdl-core`](https://www.npmjs.com/package/ytdl-core)
- [`@spotify/web-api-ts-sdk`](https://www.npmjs.com/package/@spotify/web-api-ts-sdk)

---

## 📜 License
This project is open-source under the **MIT License**.

---

## ✨ Contributing
Feel free to fork the repository and make pull requests!

**Author:** [Drouz](https://github.com/Extervin)

