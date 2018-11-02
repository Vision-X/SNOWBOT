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
`You didn't provide any arguments,
${message.author}! \n
Type ** !snow all ** to see all snow reports \n
Type ** !snow keystone ** to see a specific resort, keystone in this example \n
Type ** !snow resorts ** or ** !resorts ** to see the list of resort commands \n`)

// lets find the data for the arg they gave...
    } else if (resList.indexOf(args[0]) > -1) {
      console.log("it exists!!!!!");
      let selection = args[0];
      let WEATHERDATA = data;
      // function findResort(data) {
      //     console.log("findResort method .......");
      //     let myObj = data;
      //     console.log("MYOBJECTTTTTION   ",myObj);
      //     for (var key in myObj) {
      //       console.log("key |||||||| ", key);
      //       if (key == selection) {
      //         console.log("it matches!!!!");
      //         WEATHERDATA = myObj[key];
      //       } else {
      //       }
      //     }
      //     console.log("selected weather!! ", selection, WEATHERDATA);
      // }


      // FP.resolve(findResort(data))
      //   .then(sendMess())
      // let promise = new Promise(function(resolve, reject) {
      //   set
      // })

      // findResort(data)
      //   .then(sendMess())

      // findResort(data);

      // need to Promise chain, findResort and the data param it allows
      // (which is a FS.readFile) and needs to be snychronous, resolve to data,
      // then pass data down the chain, resolve findResort, resolve sendMessage,
      // catch, err handle this chain.
      // refactor / optimize code
      function sendMess() {
        console.log("OBJ... ", WEATHERDATA);
        let text = "``` " + `${WEATHERDATA.resortName.toUpperCase()} Snow Report
\n 24 hour total:  ${WEATHERDATA.lastDayTotal}"
\n 72 hour total:  ${WEATHERDATA.threeDayTotal}"
\n Depth:  Base: ${WEATHERDATA.baseDepth}"  ||  Top: ${WEATHERDATA.topDepth}"
\n Lifts: ${WEATHERDATA.liftNum} open out of ${WEATHERDATA.liftTotal}` + "```";
        message.channel.send(text)
      }
      sendMess();
    }
  }
};
