const amqp = require("amqplib/callback_api");
const data = require("../data");
const users = require("../data/users");
const items = require ("../data/products");
const icomments = require ("../data/reviews");
const fposts = require ( "../data/posts" );
//const fcomments = require ( "../data/reviews" );
/* const elasticsearch = require('elasticsearch');
const esclient = new elasticsearch.Client({
  host: 'localhost:9200'
}); */

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel(function(err, ch) {
        var q = 'get_forum_post';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Forum Posts - Waiting');
        ch.consume(q, async function reply(msg) {
            try {
                var r = await fposts.getAllPosts();
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var id = parseInt(msg.content.toString());
            try {
                var r = [];
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var id = parseInt(msg.content.toString());
            try {
                var r = [];
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var id = parseInt(msg.content.toString());
            try {
                var r = await items.getProductById ( id );
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var id = parseInt(msg.content.toString());
            try {
                var r = await items.getAllProducts();
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'get_all_forum_posts';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get All Forum Posts - Waiting');
        ch.consume(q, async function reply(msg) {
            var id = parseInt(msg.content.toString());
            try {
                var r = await fposts.getAllPosts();
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var id = parseInt(msg.content.toString());
            try {
                var r = await users.getUserById ( id );
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var body = JSON.parse(msg.content.toString());
            try {
                var r = {};//await fposts.addPost ();
            } catch ( err ) {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var n = msg.content.toString();
            var r = {n,k:true};//await data.forumcomments.post
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
            var n = msg.content.toString();
            var r = {n,k:true};//await data.forumratings.post
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
            var n = msg.content.toString();
            var r = {n,k:true};//await data.items.post
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
            var n = msg.content.toString();
            var r = {n,k:true};//await data.itemcomments.post
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
            var n = JSON.parse(msg.content.toString());
            
            var r = {n,k:true};//await data.users.create
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
            var n = msg.content.toString();
            var r = {n,k:true};//await data.elevateadmin
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
            var n = msg.content.toString();

            var r = {n,k:true};//await data.login(asdas)
            
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    conn.createChannel(function(err, ch) {
        var q = 'search_items';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Search items - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = msg.content.toString();

            var r = {n,k:true};//await esclient.search({....})
            
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
});