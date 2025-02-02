module.exports = {
  app: {
      token: process.env.DISCORD_TOKEN,
      prefix: process.env.PREFIX || '!',
      playing: 'Music!',
  },
  opt: {
      maxVol: 100,
      defaultVolume: 75,
      leaveOnEnd: true,
      leaveOnEmpty: true,
      leaveOnEmptyCooldown: 30000,
  }
};
