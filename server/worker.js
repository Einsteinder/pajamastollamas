const amqp = require("amqplib/callback_api");
const data = require("../data");
const users = data.users;
const items = data.products;
const icomments = data.review;
const fposts = data.posts;
//const fcomments = require ( "../data/reviews" );
const elasticsearch = require('elasticsearch');
const esclient = new elasticsearch.Client({
  host: 'localhost:9200'
});


amqp.connect('amqp://localhost', (err, conn) => {
    // Get A forum post
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
    // gets comments on a forum post
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
    // gets comments on an item
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
    // gets an item
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
    // gets all items
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
    // gets all forum posts
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
    // gets a user info
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
    //Creates a forum post
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
    // Creates a forum comment
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
    // rates a forum post
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
    // Creates an item
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
    // Creates a comment on an item
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
    // Creates a user
    conn.createChannel(function(err, ch) {
        var q = 'post_user';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post User - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = JSON.parse(msg.content.toString());
            var enpassword = bcrypt.hashSync(n.password);
            var userInfo = {
                userName: n.email,
                password: enpassword,
                nickName: n.nickname
            }
            var r = await users.addUser(userInfo);//await data.users.create

            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    // Elevates user to admin
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
    // handles login logic
    conn.createChannel(function(err, ch) {
        var q = 'post_login';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Login - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = msg.content.toString();
            await  passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                return user.id;
            });
            ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r)), {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });
    });
    // Searches items for query using elastic search
    conn.createChannel(function(err, ch) {
        var q = 'search_items';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Search items - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = msg.content.toString();

            var r = {n,k:true};
            
            esclient.search ({
                index: "product",
                body: { 
                    query: { "match_all": {} } 
                }
            }).then((r) => {
                ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(r.hits.hits)), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
            }).catch ( err => {
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
            });
        });
    });
});