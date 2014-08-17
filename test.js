var BMP085 = require('bmp085'),
    barometer = new BMP085({
        'mode': 1,
        'address': 0x77,
        'device': '/dev/i2c-0'
    }),
    dht_sensor = require("node-dht-sensor");

barometer.read(function (data) {
  console.log("Temperature B : "+data.temperature.toFixed(1)+"C");
  console.log("Pressure      : "+data.pressure.toFixed(1)+" mbar");
  
  var altitude = 44330.0 * (1.0 - Math.pow(data.pressure / 1013.25, (1.0/5.255)));
  console.log("Altitude      : "+altitude.toFixed(1)+" m");
  
  var mslp = data.pressure / Math.pow(1.0 - altitude/44330.0, 5.255);
  console.log("MSLP          : "+mslp.toFixed(1)+" mbar");  
});

var readout = dht_sensor.readSpec(22, 4);
console.log("Temperature A : "+readout.temperature.toFixed(1)+"C");
console.log("Humidity      : "+readout.humidity.toFixed(1)+"%");
