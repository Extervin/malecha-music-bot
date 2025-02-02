module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
      console.log(`Бот ${client.user.tag} готов!`);
      client.user.setActivity('Music!', { type: 'LISTENING' });
  },
};
