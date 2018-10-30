module.exports = {
  name: 'help',
  execute(message, args) {
    message.channel.send(
`*** Help is here  ***  \n
Type ** !snow all ** to see all resort snow totals \n
Type ** !snow list ** to see a list of resort commands \n`)
  }
};
