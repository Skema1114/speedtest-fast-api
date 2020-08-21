const FastSpeedtest = require("fast-speedtest-api");
require('dotenv').config()

module.exports = {
  async get(request, response) {
    let speedtestUpload = new FastSpeedtest({
      token: process.env.API_KEY,      
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      requestUrl: "https://ipv4-c001-poa001-avato-isp.1.oca.nflxvideo.net/speedtest/range/0-2048?c=br&n=262907&v=5&e=1597756090&t=kDplcv6f_OhG7l5WOYSYeZcKhyA",
      bufferSize: 8,
      testType: 'upload',
      client: '177.87.220.82',
      unit: FastSpeedtest.UNITS.Mbps,
      proxy: '177.87.220.82'
    });

    let speedtestDownload = new FastSpeedtest({
      token: process.env.API_KEY,
      verbose: false,      
      timeout: 10000,
      https: true,      
      urlCount: 5,
      requestUrl: "https://ipv4-c001-poa001-avato-isp.1.oca.nflxvideo.net/speedtest/range/0-2048?c=br&n=262907&v=5&e=1597756090&t=kDplcv6f_OhG7l5WOYSYeZcKhyA",
      bufferSize: 8,
      testType: 'download',
      client: '177.87.220.82',
      unit: FastSpeedtest.UNITS.Mbps,
      proxy: '177.87.220.82'
    });

    console.log('reload')
    await speedtestUpload.getSpeed().then(up => {
      upFinal = up;
      console.log('upload done...');
    }).catch(e => {
      console.error(e.message);
    });

    await speedtestDownload.getSpeed().then(down => {
      downFinal = down;
      console.log('download done...');
    }).catch(e => {
      console.error(e.message);
    });


    console.log('up ' + upFinal + ' Mbps | down ' + downFinal + ' Mbps');
    response.json({ 'up': upFinal, 'down': downFinal, 'unit': 'Mbps' });
  }
}
