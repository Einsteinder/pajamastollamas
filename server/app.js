const express = require ( "express" );
const bodyParser = require ( "body-parser" );

let app = express();
app.use ( bodyParser.json() );

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

app.get ( "/reviews/:id", async ( req, res ) => {
    let itemid = req.params.id;
    let ret = undefined; //await getReviews(itemid);
    mqConn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            var corr = generateUuid();
            ch.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === corr) {
                    res.status(200).send(msg.content);
                }
            }, {noAck: true});

            ch.sendToQueue('get_reviews', new Buffer(itemid.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});

app.get ( "/posts/:id", async ( req, res ) => {
    let itemid = req.params.id;
    let ret = undefined; //await getPosts(itemid);

    res.status ( 200 ).send ( ret );
});

app.get ( "/item/:id", async ( req, res ) => {
    let itemid = req.params.id;
    let ret = undefined; //await getItem(itemid);

    res.status ( 200 ).send ( ret );
});

app.get ( "/items/", async ( req, res ) => {
    let ret = undefined;
    res.status(200).send(ret);
});

app.get ( "/user/:id", async ( req, res ) => {
    let id = req.params.id;
    res.status(200).send(id);
});

// POSTS

app.post ( "/item/", async ( req, res ) => {
    let body = req.body;
    res.status(200).send(body);
});

app.post ( "/review/:id", async ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    res.status(200).send(body);
});

app.post ( "/post/:id", async ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    res.status(200).send({body,id});
});

app.post ( "/user/", async ( req, res ) => {
    let body = req.body;
    re.status(200).send(body);
});

app.post ( "/admin/:id", async ( req, res ) => {
    let id = req.params.id;
    res.status(200).send(id);
});

app.post ( "/login", async ( req, res ) => {
    let body = req.bod;
    let username = body.username;
    let hPass = body.password;
    let check = undefined;
    try {
        check = await validate ( username, hPass );
    } catch (e) {
        res.status(400).send(e);
    }
    
});

app.listen ( 5000, () => {
    console.log ( "Server running on http://localhost:5000" );
});