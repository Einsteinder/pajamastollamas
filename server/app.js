const express = require ( "express" );
const bodyParser = require ( "body-parser" );
const cookieParser = require ( "cookie-parser" );
const db = require("../data");
const redis = require("redis");
const bluebird = require ( "bluebird" ); //For promisfy-ing the redis client
const bcrypt = require ( "bcrypt" );
bluebird.promisifyAll(redis.RedisClient.prototype);
const client = redis.createClient();

let app = express();
app.use ( cookieParser() );
app.use ( bodyParser.json() );
app.use ( '/img', express.static(__dirname + '/images' ) );



async function sessionValid ( sessionkey ) {
    if ( 1 == await client.existsAsync ( sessionkey) ) {
        let u = JSON.parse(await client.getAsync ( sessionkey ) );
        return (u.admin || 1);
    } else {
        return 0;
    }
}

async function getCurrentUser ( sessionkey ) {
    if ( 1 == await client.existsAsync ( sessionkey ) ) {
        let u = JSON.parse(await client.getAsync ( sessionkey ) );
        return u;
    } else {
        return undefined;
    }
}

const amqp = require ( "amqplib/callback_api" );
let mqConn = undefined;

amqp.connect('amqp://localhost', (err, conn) => {
    mqConn = conn;
});

function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

app.use ( function ( req, res, next ) {
    //console.log ( req.headers );
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept");
    if ( req.method === "OPTIONS" ) {
        res.sendStatus ( 200 );
    } else {
        next();
    }
});

/* Routes */
// GETS



// Gets all forum posts
app.get ( "/forum/", ( req, res ) => {
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_all_forum_posts', new Buffer(""), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets all forum post comments
app.get ( "/forum/comments/", ( req, res ) => {
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_all_forum_post_comments', new Buffer(""), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets all item comments
app.get ( "/item/comments/", ( req, res ) => {
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_all_item_comments', new Buffer(""), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the comments for post :id
app.get ( "/forum/comments/:id", ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_forum_comments', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the comments for item :id
app.get ( "/item/comments/:id", async ( req, res ) => {
    let itemid = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_item_comments', new Buffer(itemid.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the items matching the search term :query
app.get ( "/items/search/:query", ( req, res ) => {
    let query = req.params.query;
    mqConn.createChannel(function (err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('search_items', new Buffer(query.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the item :id
app.get ( "/item/:id", async ( req, res ) => {
    let itemid = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});
            console.log ( itemid );
            ch.sendToQueue('get_item', new Buffer(itemid.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets all items
app.get ( "/items/", async ( req, res ) => {
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_all_items', new Buffer(""), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the user with id :id
app.get ( "/user/:id", async ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    if ( msg.content == "⟂" ) {
                        res.status(404).send("Error");    
                    } else {
                        res.status(200).send(msg.content);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_user', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets a forum post ":id"
app.get ( "/forum/:id", ( req, res ) => {
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    msg = msg.content.toString();
                    if ( msg == "⟂") {
                        res.status(404).send({message: "Error"});
                    } else {
                        res.status(200).send(msg);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_forum_post', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// POSTS

// Make a new forum post
app.post ( "/forum/", async ( req, res ) => {
    if (!req.cookies.sessionId || (0 == await sessionValid(req.cookies.sessionId))) {
        res.status(400).send({ message: 'Session Expired'}) // handle error
        return;
    }
    let u = await getCurrentUser ( req.cookies.sessionId );
    let body = req.body;
    body.userId = u._id;
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

// Make a new comment on forum post :id
app.post ( "/forum/comments/:id", async ( req, res ) => {
    if (!req.cookies.sessionId || (0 == await sessionValid(req.cookies.sessionId))) {
        res.status(400).send({ message: 'Session Expired'}) // handle error
        return;
    }
    let u = await getCurrentUser ( req.cookies.sessionId );
    let id = req.params.id;
    let body = req.body;
    body.userId = u._id;
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

app.post ( "/forum/comments/rating/:id", async (req, res) => {
    if ( !req.cookies.sessionId || (0 == await sessionValid(req.cookies.sessionId)) ) {
        res.status ( 400 ).send ({message: "Session Expired"});
        return;
    }
    let id = req.params.id;
    let body = req.body;
    console.log ( body );
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_forum_comment_rating', new Buffer(JSON.stringify({am: body, id})), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Make a rate on forum post :id (body should be +/- 1)
app.post ( "/forum/rating/:id", async ( req, res ) => {
    if (!req.cookies.sessionId || (0 == await sessionValid(req.cookies.sessionId))) {
        res.status(400).send({ message: 'Session Expired'}) // handle error
        return;
    }
    let id = req.params.id;
    let body = req.body;
    body = 1;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('post_forum_rating', new Buffer(JSON.stringify({am: body, id})), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Make a new item
app.post ( "/item/", async ( req, res ) => {
    if (!req.cookies.sessionId || (0 == await sessionValid(req.cookies.sessionId))) {
        res.status(400).send({ message: 'Session Expired'}) // handle error
        return;
    }
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

// Make a new comment on item :id
app.post ( "/item/comments/:id", async ( req, res ) => {
    if (!req.cookies.sessionId || (0 == await sessionValid(req.cookies.sessionId))) {
        res.status(400).send({ message: 'Session Expired'}) // handle error
        return;
    }
    let u = await getCurrentUser ( req.cookies.sessionId );
    let id = req.params.id;
    let body = req.body;
    body.userId = u._id;
    console.log ( {id, body} );
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                    return;
                }
            }, {noAck: true});

            ch.sendToQueue('post_item_comment', new Buffer(JSON.stringify({id,body})), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Make a new user
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

// Make a new admin for user :id
app.post ( "/admin/:id", async ( req, res ) => {
    if (!req.cookies.sessionId || !(2 == await sessionValid(req.cookies.sessionId))) {
        res.status(400).send({ message: 'Session Expired'}) // handle error
        return;
    }
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

// Logins the user with the given information. Creates a session key and returns it
app.post ( "/login", async ( req, res ) => {
    let body = req.body;
    let username = body.username;
    let hPass = body.password;
    if ( req.cookies.sessionId ) {
        if ( 0 == await sessionValid ( req.cookies.sessionId ) ) {
            res.clearCookie("sessionId");
        } else {
            await client.expireAsync(req.cookies.sessionId, 60*60);
            res.sendStatus(200);
            return;
        }
    }
    let user = undefined;
    try {
        user = await db.users.getUserByEmail(username)
    } catch ( e ) {
        res.status(403).send ( {message: "User not found"} );
        return;
    }
    if ( bcrypt.compareSync(hPass,user.password) ) {
        let id = generateUuid();
        await client.setAsync ( id, JSON.stringify(user), "EX", 60 * 60 );
        res.cookie( "sessionId", id, true );
        let userc = {...user};
        userc.password = undefined;
        res.status(200).send ( userc );
    } else {
        res.status(400).send ( {message: "Error - Login Invalid"} );
    }
    
});

app.post ( "/logout", async ( req, res ) => {
    res.clearCookie("sessionId");
    if ( req.cookies.sessionId ) {
        await client.delAsync ( req.cookies.sessionId );
    }
    res.sendStatus(200);
});

app.use ( "*", (req, res ) => {
    console.log ( "Bad Route" );
    res.status(404).send();
})

// Start Listening for the server
app.listen ( 5000, () => {
    console.log ( "Server running on http://localhost:5000" );
});