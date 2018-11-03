module.exports = {
  name: "snow",
  description: "snow totals",
  args: true,
  execute(message, args, data) {
    let WEATHERDATA;

    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!
          \n Type ** !snow all ** to see all snow reports
          \n Type ** !snow keystone or keyst or key ** to see keystone (in this example)
          \n Type ** !snow resorts ** or ** !resorts ** to see the list of resort commands
          \n`
      );
    } else if (args[0].toLowerCase() == "all") {
      console.log("args is all :", args[0]);
      let WEATHERDATA = data;
      let fullMessage = "";
      let num = 1;
      WEATHERDATA.map(resort => {
        let text = `[${num}] - ${resort.resortName.toUpperCase()} \n`;
        fullMessage += text;
        num++;
      });
      console.log("Full message: ", fullMessage);
      message.channel.send("```" + fullMessage + "```");
    } else {
      let WEATHERDATA = data;
      const sendMess = () => {
        if (typeof WEATHERDATA != "undefined") {
          let text =
            "``` " +
            `${WEATHERDATA.resortName.toUpperCase()} Snow Report
              \n Snow  [ 24hr: ${WEATHERDATA.lastDayTotal}" 72hr: ${
              WEATHERDATA.threeDayTotal
            }" ]
              \n Depth [ Base: ${WEATHERDATA.baseDepth}" Top: ${
              WEATHERDATA.topDepth
            }" ]
              \n Lifts [ ${WEATHERDATA.liftNum} open out of ${
              WEATHERDATA.liftTotal
            } ]` +
            "```";
          message.channel.send(text);
        } else {
          let text = "*** resort not found ***";
          message.channel.send(text);
        }
      };
      sendMess();
    }
  }
};
