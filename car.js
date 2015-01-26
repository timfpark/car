var config = require('./config')
  , linereader = require('line-reader')
  , nitrogen = require('nitrogen');

var service = new nitrogen.Service(config);

var medilync = new nitrogen.Device({
    api_key: process.env.API_KEY,
    name: 'BMW X1 WBAVM1C51EVW46999',
    nickname: 'car'
});

var data = [];
var dataIdx = 0;

linereader.eachLine('data.csv', function(line, last) {
    data.push(line);
});

service.connect(medilync, function(err, session) {
    setInterval(function() {
        if (data.length-1 < dataIdx) return;

        var message = new nitrogen.Message({
            type: '_obd2',
            body: {
                data: data[dataIdx++] 
            }
        });

        message.send(session, function(err) {
            if (err) return console.log('message send error: ' + err);
            console.log('message sent');
        });
    }, 1 * 1000);
});
