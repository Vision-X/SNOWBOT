module.exports = {
  name: 'snow',
  description: 'snow totals',
  args: true,
  execute(message, args, data) {
    // const fs = require('fs');
    // const FP = require('functional-promise');
    let WEATHERDATA;
    // console.log("ARGS... ", args);

    if (!args.length) {
      return message.channel.send(
          `You didn't provide any arguments, ${message.author}!
          \n Type ** !snow all ** to see all snow reports
          \n Type ** !snow keystone or keyst or key ** to see keystone (in this example)
          \n Type ** !snow resorts ** or ** !resorts ** to see the list of resort commands
          \n`)
    } else if (args[0] == 'all') {
        console.log("args is all :", args[0]);
        let WEATHERDATA = data;
        let fullMessage = "";
        // let text = "``` " + `${resort.resortName.toUpperCase()} Snow Report
        // \n Snow  [ 24hr: ${resort.lastDayTotal}" 72hr: ${resort.threeDayTotal}" ]
        // \n Depth [ Base: ${resort.baseDepth}" Top: ${resort.topDepth}" ]
        // \n Lifts [ ${resort.liftNum} open out of ${resort.liftTotal} ]` + "```";
        let num = 1;
        WEATHERDATA.map((resort) => {
          let text = `[${num}] - ${resort.resortName.toUpperCase()} \n`;
          fullMessage += text
          num++;
        })
        console.log("Full message: ", fullMessage);
        message.channel.send("```" + fullMessage + "```")

    } else {
        let WEATHERDATA = data;
        const sendMess = () => {
          if (typeof WEATHERDATA != 'undefined') {
              let text = "``` " + `${WEATHERDATA.resortName.toUpperCase()} Snow Report
              \n Snow  [ 24hr: ${WEATHERDATA.lastDayTotal}" 72hr: ${WEATHERDATA.threeDayTotal}" ]
              \n Depth [ Base: ${WEATHERDATA.baseDepth}" Top: ${WEATHERDATA.topDepth}" ]
              \n Lifts [ ${WEATHERDATA.liftNum} open out of ${WEATHERDATA.liftTotal} ]` + "```";
              message.channel.send(text)


          // else if (args[0] == 'all') {
          //   console.log("args is all :", args[0]);
          //   let fullMessage = "";
          //   // let text = "``` " + `${resort.resortName.toUpperCase()} Snow Report
          //   // \n Snow  [ 24hr: ${resort.lastDayTotal}" 72hr: ${resort.threeDayTotal}" ]
          //   // \n Depth [ Base: ${resort.baseDepth}" Top: ${resort.topDepth}" ]
          //   // \n Lifts [ ${resort.liftNum} open out of ${resort.liftTotal} ]` + "```";
          //   let text = "```" + `${resort.resortName.toUpperCase()}` + "```";
          //   WEATHERDATA.map((resort) => {
          //     // message.channel.send(text);
          //     fullMessage += text
          //   })
          //   console.log("Full message: ", fullMessage);
          //   message.channel.send(fullMessage)
          } else {
            let text = "*** resort not found ***"
            message.channel.send(text);
          }
        }
      sendMess();
    }
  }
};
