const amqp = require("amqplib/callback_api");
const data = require("../data");
const users = data.users;
const items = data.products;
const icomments = data.review;
const fposts = data.posts;
const fcomments = data.postComments;
const elasticsearch = require('elasticsearch');
const esclient = new elasticsearch.Client({
  host: 'localhost:9200'
});
esclient.index({
    index: 'product',
    type: 'doc',
    body: {}
})


amqp.connect('amqp://localhost', (err, conn) => {
    // Get A forum post
    conn.createChannel(function(err, ch) {
        var q = 'get_forum_post';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get Forum Posts - Waiting');
        ch.consume(q, async function reply(msg) {
            var id = parseInt(msg.content.toString());
            try {
                var r = await fposts.getPostById ( id );
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
                var r = await fcomments.getPostCommentsByParentId ( id );
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
                var r = await icomments.getReviewsByProductId ( id );
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
    // gets all forum posts' comments
    conn.createChannel(function(err, ch) {
        var q = 'get_all_forum_post_comments';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get All Forum Post Comments - Waiting');
        ch.consume(q, async function reply(msg) {
            var id = parseInt(msg.content.toString());
            try {
                var r = await fcomments.getAllPostComments();
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
    // gets all forum posts' comments
    conn.createChannel(function(err, ch) {
        var q = 'get_all_item_comments';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Get All Item Comments - Waiting');
        ch.consume(q, async function reply(msg) {
            var id = parseInt(msg.content.toString());
            try {
                var r = await icomments.getAllReviews();
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
            var n = JSON.parse(msg.content.toString());
            try {
                var r = await fposts.addPost ( n.userId, n.timestamp, n.title, n.content );
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
            var n = JSON.parse(msg.content.toString());
            try {
                var r = await fcomments.addPostComment ( n.id, n.body.timestamp, n.body.content, n.body.userId );
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
    // Rates a forum comment
    conn.createChannel(function(err, ch) {
        var q = 'post_forum_comment_rating';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Forum Comment Rating - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = JSON.parse(msg.content.toString());
            try {
                var r = await fcomments.changeVoteScore ( n.id, n.am );
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
    // rates a forum post
    conn.createChannel(function(err, ch) {
        var q = 'post_forum_rating';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Forum Rating - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = JSON.parse(msg.content.toString());
            try {
                var r = await fposts.changeVoteScore ( n.id, n.am );
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
    // Creates an item
    conn.createChannel(function(err, ch) {
        var q = 'post_item';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Item - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = JSON.parse(msg.content.toString());
            try {
                var r = await items.addProduct ( n.imgURL, n.name, n.price, n.description );
                esclient.index ({
                    index: 'product',
                    type: 'doc',
                    id: r._id,
                    body: r
                });
                
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
    // Creates a comment on an item
    conn.createChannel(function(err, ch) {
        var q = 'post_item_comment';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Item Comment - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = JSON.parse(msg.content.toString());
            try {
                var r = await icomments.addReview ( n.body.userId, n.id, n.body.content, n.body.timestamp );
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
    // Creates a user
    conn.createChannel(function(err, ch) {
        var q = 'post_user';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post User - Waiting');
        ch.consume(q, async function reply(msg) {
            var n = JSON.parse(msg.content.toString());
            try {
                var r = await users.addUser ( n.nickname, n.email, n.password );
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
    // Elevates user to admin
    conn.createChannel(function(err, ch) {
        var q = 'post_admin';
    
        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Post Admin - Waiting');
        ch.consume(q, async function reply(msg) {
            var id = JSON.parse(msg.content.toString());
            try {
                var r = await users.updateUser ( id, { admin: 2 } )
            } catch ( err ) {
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
                return;
            }
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
            var query = msg.content.toString();
            
            esclient.search ({
                index: "product",
                body: { 
                    query: { wildcard: { description: `*${query}*` } } 
                }
            }).then((r) => {
                let a = r.hits.hits.map ( (me) => {
                    return me._source;
                });
                ch.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(a)), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
            }).catch ( err => {
                console.log ( err );
                ch.sendToQueue(msg.properties.replyTo, new Buffer("⟂"), {correlationId: msg.properties.correlationId});
                ch.ack(msg);
            });
        });
    });
});