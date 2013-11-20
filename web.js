var express = require("express");
var app = express();
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/mydb';

app.use(express.logger());

app.get('/', function(request, response) {
    var ip = request.ip;

    var currentVisitor = {
        ip: ip,
        time: new Date().toISOString()
    };

    mongo.Db.connect(mongoUri, function (err, db) {

        db.collection('visitors', function(er, collection){
            //Find last visitors
            var visitors = collection.find().sort({'time': -1}).limit(500).toArray(function(err, visitors){
                //Build answer
                var answer = '<h1>Hello ' + ip + '!</h1>';
                if(visitors.length){
                    //Table header
                    answer += '';
                    answer += '<table border="1" cellpadding="10">';
                    answer += '<thead>';
                    answer += '<tr><th colspan="2">Previous '+visitors.length+' visitors</th></tr>';
                    answer += '<tr><th>IP</th><th>Time</th>';
                    answer += '</thead>';
                    //Table rows
                    visitors.forEach(function(visitor){
                        if(!err){
                            answer +=  '<tr><td>'+visitor.ip+'</td><td>'+visitor.time+'</td></tr>';
                        }
                    });
                    //Table footer
                    answer += '</table>'
                }
                //Add current visitor and send the response
                db.collection('visitors').insert(currentVisitor, function(err, data){});
                response.send(answer);
            });
        });
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

