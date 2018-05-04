const express = require ( "express" );
const bodyParser = require ( "body-parser" );

let app = express();
app.use ( bodyParser.json() );
app.use(express.static('static'))

const amqp = require ( "amqplib/callback_api" );
let mqConn = undefined;

amqp.connect('amqp://localhost', (err, conn) => {
    mqConn = conn;
});

function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

/* Routes */

// GETS

// Gets a forum post
app.get ( "forum/:id", ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_forum_post', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.get ( "forum/comments/:id", ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_forum_comments', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.get ( "forum/rating/:id", ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_forum_rating', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.get ( "item/comments/:id", async ( req, res ) => {
    let itemid = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_item_comments', new Buffer(itemid.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.get ( "/item/:id", async ( req, res ) => {
    let itemid = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_item', new Buffer(itemid.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.get ( "/items/", async ( req, res ) => {
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_all_items', new Buffer(""), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.get ( "/user/:id", async ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_user', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// POSTS

app.post ( "/forum/", ( req, res ) => {
    let body = req.body;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_forum_post', new Buffer(JSON.stringify(body)), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.post ( "/forum/comments/:id", ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_forum_comment', new Buffer(JSON.stringify({body, id})), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.post ( "/forum/rating/:id", ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_forum_rating', new Buffer(JSON.stringify({body, id})), { correlationId: corr, replyTo: q.queue });
        });
    });
});

//Requires user to be logged in 
app.post ( "/item/", async ( req, res ) => {
    let body = req.body;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_item', new Buffer(JSON.stringify(body)), { correlationId: corr, replyTo: q.queue });
        });
    });
});

//Requires user to be logged in
app.post ( "/item/comments/:id", async ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_item_comment', new Buffer(JSON.stringify({id,body})), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.post ( "/user/", async ( req, res ) => {
    let body = req.body;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_user', new Buffer(JSON.stringify(body)), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.post ( "/admin/:id", async ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_admin', new Buffer(JSON.stringify(id)), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.post ( "/login", async ( req, res ) => {
    let body = req.bod;
    let username = body.username;
    let hPass = body.password;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_login', new Buffer(JSON.stringify({username, hPass})), { correlationId: corr, replyTo: q.queue });
        });
    });
    
});

app.listen ( 5000, () => {
    console.log ( "Server running on http://localhost:5000" );
});