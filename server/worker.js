var amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel(function(err, ch) {
        var q = 'get_reviews';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Reviews - Waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            console.log(" [.] fib(%d)", n);
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_posts';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Posts - Waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            console.log(" [.] fib(%d)", n);
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_item';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Item - Waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            console.log(" [.] fib(%d)", n);
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_all_items';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get All Items - Waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            console.log(" [.] fib(%d)", n);
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_user';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get user - waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            console.log(" [.] fib(%d)", n);
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
});