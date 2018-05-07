const express = require ( "express" );
const bodyParser = require ( "body-parser" );
const db = require("./data");
const session = require("express-session");
const redis = require("redis");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
            db.getUserByUsername(username).then((user) => {
                if (!user) return done(null, false, {message: "user not found"});
                bcrypt.compare(password, user.hashedPassword, (err, res) => {
                    if (err) return done(err);
                    if (!res) return done(null, false, {message: "password does not match"});
                    return done(null, user);
                });
            });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    db.getUserByID(id).then((user) => {
        done(null, user);
    });
});

let app = express();
app.use ( bodyParser.json() );
app.use(express.static('static'))
app.use(passport.initialize());
var redisStore = require('connect-redis')(express);
var rClient = redis.createClient();

app.use(session({
        id:uuid.v4(),
        secret:'secret',
        store: new redisStore({
            host:'localhost',
            port:3000,
            client:rClient,
            ttl: 7200
        }),
        saveUninitialized:false,
        resave:false
}));

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

// Gets a forum post ":id"
app.get ( "/forum/:id", ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
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

            ch.sendToQueue('get_forum_post', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets all forum posts
app.get ( "/forum/", ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_all_forum_posts', new Buffer(""), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the comments for post :id
app.get ( "/forum/comments/:id", ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
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

            ch.sendToQueue('get_forum_comments', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the comments for item :id
app.get ( "/item/comments/:id", async ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
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

// Gets the item :id
app.get ( "/item/:id", async ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
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

// Gets all items
app.get ( "/items/", async ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
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

// Gets the user with id :id
app.get ( "/user/:id", async ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
    let id = req.params.id;
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    if ( msg.content == "⟂" ) {
                        res.status(404).send("User Not Found");    
                    } else {
                        res.status(200).send(msg.content);
                    }
                }
            }, {noAck: true});

            ch.sendToQueue('get_user', new Buffer(id.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Gets the items matching the search term :query
app.get ( "/items/search/:query", ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
    let query = req.params.query;
    mqConn.createChannel(function (err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('search_items', new Buffer(query.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// POSTS

// Make a new forum post
app.post ( "/forum/", ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
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

            ch.sendToQueue('post_forum_post', new Buffer(JSON.stringify(body)), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Make a new comment on forum post :id
app.post ( "/forum/comments/:id", ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
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

// Make a rate on forum post :id (body should be +/- 1)
app.post ( "/forum/rating/:id", ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
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

// Make a new item
app.post ( "/item/", async ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
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
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
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

// Make a new user
app.post ( "/user/", async ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
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

            ch.sendToQueue('post_user', new Buffer(JSON.stringify(body)), { correlationId: corr, replyTo: q.queue });
        });
    });
});

// Make a new admin for user :id
app.post ( "/admin/:id", async ( req, res ) => {
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
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
    if (!req.session) {
        return next(new Error('Session Expired')) // handle error
      }
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

// Start Listening for the server
app.listen ( 5000, () => {
    console.log ( "Server running on http://localhost:5000" );
});