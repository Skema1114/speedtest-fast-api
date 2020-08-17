const FastSpeedtest = require("fast-speedtest-api");
require('dotenv').config()

module.exports = {
  async get(request, response) {
    let speedtestUpload = new FastSpeedtest({
      token: process.env.API_KEY, // required
      verbose: false, // default: false
      timeout: 10000, // default: 5000
      https: true, // default: true
      urlCount: 5, // default: 5
      bufferSize: 8, // default: 8
      testType: 'upload',
      unit: FastSpeedtest.UNITS.Mbps, // default: Bps
      proxy: 'http://optional:auth@my-proxy:123' // default: undefined
    });

    let speedtestDownload = new FastSpeedtest({
      token: process.env.API_KEY, // required
      verbose: false, // default: false
      timeout: 10000, // default: 5000
      https: true, // default: true
      urlCount: 5, // default: 5
      bufferSize: 8, // default: 8
      testType: 'download',
      unit: FastSpeedtest.UNITS.Mbps, // default: Bps
      proxy: 'http://optional:auth@my-proxy:123' // default: undefined
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