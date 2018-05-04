var amqp = require("amqplib/callback_api");
const data = require("../data");

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel(function(err, ch) {
        var q = 'get_forum_post';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Forum Posts - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_forum_comments';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Forum Comments - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_forum_rating';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Forum Rating - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_item_comments';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Item Comments - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_item';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Item - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_all_items';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get All Items - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = [{n,k:true}];
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_user';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get User - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_forum_post';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Forum Post - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_forum_comment';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Forum Comment - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_forum_rating';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Forum Rating - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_item';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Item - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_item_comment';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Item Comment - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_user';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post User - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_admin';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Admin - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'post_login';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Login - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = parseInt(msg.content.toString());
            var r = {n,k:true};
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
});