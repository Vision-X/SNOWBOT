module.exports = {
    name: 'commands',
    execute(message, args) {
      message.channel.send(
"```" + `!snow all
\n!snow resortName
\n!help` + "```")
    }
};
