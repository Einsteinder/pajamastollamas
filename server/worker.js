var amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel(function(err, ch) {
        var q = 'get_reviews';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Reviews - Waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_posts';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Posts - Waiting');
        ch.consume(q, function reply(msg) {
            var id = parseInt(msg.content.toString());
            var r = id;    
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
            var r = [{a:"hello"},{b:"no"}];    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
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
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_item';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Item - waiting');
        ch.consume(q, function reply(msg) {
            var n = JSON.parse(msg.content);
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_review';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post review - waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_post';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post post - waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_user';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post user - waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_admin';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Admin - waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_login';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post login - waiting');
        ch.consume(q, function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = n;    
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
});