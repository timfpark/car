var config = require('./config')
  , nitrogen = require('nitrogen');

var service = new nitrogen.Service(config);

var medilync = new nitrogen.Device({
    api_key: process.env.API_KEY,
    name: 'Medilync',
    nickname: 'medilync'
});

service.connect(medilync, function(err, session) {
    setInterval(function() {
        var message = new nitrogen.Message({
            type: '_measurement',
            body: {
                currentTime: new Date()
            }
        });

        message.send(session, function(err) {
            if (err) return console.log('message send error: ' + err);
            console.log('message sent');
        });
    }, 5 * 1000);
});
