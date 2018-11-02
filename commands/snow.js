module.exports = {
  name: 'snow',
  description: 'snow totals',
  args: true,
  execute(message, args, data) {
    const fs = require('fs');
    // const FP = require('functional-promise');
    let resList = ['arapahoebasin', 'aspensnowmass', 'beavercreek',
                   'breckenridge', 'copper', 'crestedbutte', 'eldora',
                   'keystone', 'loveland', 'telluride', 'purgatory',
                   'silverton', 'steamboat', 'vail', 'winterpark', 'wolfcreek'];
    let WEATHERDATA;


    if (!args.length) {
      return message.channel.send(
          `You didn't provide any arguments, ${message.author}! 
          \n Type ** !snow all ** to see all snow reports
          \n Type ** !snow keystone or keyst or key ** to see keystone (in this example)
          \n Type ** !snow resorts ** or ** !resorts ** to see the list of resort commands
          \n`)

// lets find the data for the arg they gave...
} else {
      console.log("it exists!!!!!");
      let WEATHERDATA = data;
      // refactor / optimize code
      function sendMess() {
        if (typeof WEATHERDATA != 'undefined') {
            let text = "``` " + `${WEATHERDATA.resortName.toUpperCase()} Snow Report
            \n 24 hour total:  ${WEATHERDATA.lastDayTotal}"
            \n 72 hour total:  ${WEATHERDATA.threeDayTotal}"
            \n Depth:  Base: ${WEATHERDATA.baseDepth}"  ||  Top: ${WEATHERDATA.topDepth}"
            \n Lifts: ${WEATHERDATA.liftNum} open out of ${WEATHERDATA.liftTotal}` + "```";
            message.channel.send(text)
        }

        else {
            let text = "*** resort not found ***"
            message.channel.send(text);
        }
      }
      sendMess();
    }
  }
};
