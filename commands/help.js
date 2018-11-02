module.exports = {
  name: 'help',
  execute(message, args) {
    message.channel.send(
`*** Help is here  ***  \n
  Type ** !snow all ** to see a list of resort names \n
  Type ** !snow resortname ** to see snow report for resortName \n
  Ex:   ** !snow vail ** returns.... \n`
+ "```" + `Vail Snow Report (EXAMPLE DATA ONLY)
\n Snow  [ 24hr: 10" 72hr: 22" ]
\n Depth [ Base: 80" Top: 125" ]
\n Lifts [ 29 open out of 31 ]` + "```")
  }
};
