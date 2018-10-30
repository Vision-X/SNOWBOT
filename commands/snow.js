module.exports = {
  name: 'snow',
  description: 'snow totals',
  args: true,
  execute(message, args, data) {
    const fs = require('fs');
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
    } else if (resList.indexOf(args[0]) > -1) {
      console.log("it exists!!!!!");
      let selection = args[0];

      function findResort(data) {
          console.log("findResort method .......");
          let myObj = data;
          console.log("MYOBJECTTTTTION   ",myObj);
          for (var key in myObj) {
            console.log("key |||||||| ", key);
            if (key == selection) {
              console.log("it matches!!!!");
              WEATHERDATA = myObj[key];
            } else {
            }
          }
          console.log("selected weather!! ", selection, WEATHERDATA);
      }
      findResort(data);
      console.log("OBJ... ", WEATHERDATA);
  message.channel.send(`*** resort totals *** \n ${resList[resList.indexOf(args[0])]} \n
  ${WEATHERDATA.resortName} has ${WEATHERDATA.lastDayTotal} in the last 24 hours`)
    }
  }
};
