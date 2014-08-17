var BMP085 = require('bmp085'),
    barometer = new BMP085({
        'mode': 1,
        'address': 0x77,
        'device': '/dev/i2c-0'
    }),
    dht_sensor = require("node-dht-sensor");

var station = {

  start: function() {
    station.read();

    setTimeout(function() {
      station.start();
    }, 5000);
  },
  
  read: function() {
    barometer.read(function (data) {
  
      var readout = dht_sensor.readSpec(22, 4);
      //var altitude = 44330.0 * (1.0 - Math.pow(data.pressure / 1013.25, (1.0/5.255)));
      var altitude = 756;
      var mslp = data.pressure / Math.pow(1.0 - altitude/44330.0, 5.255);

      console.log("Temp A: "+readout.temperature.toFixed(1)+"C, "+
                  "Humidity: "+readout.humidity.toFixed(1)+"%, "+
                  "Temp B: "+data.temperature.toFixed(1)+"C, "+
                  "MSLP: "+mslp.toFixed(1)+" mbar");
    });
  }
}

station.start();
