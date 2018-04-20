var amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        var ex = 'getReviews';
        ch.assertExchange(ex, 'fanout', {durable: false});
        ch.assertQueue('', {exclusive: true}, (err,q) => {
            console.log(`Using Queue ${q.queue}`);
            ch.bindQueue(q.queue, ex, '');
            ch.consume(q.queue, (msg) => {
                console.log ( msg.content.toString() );
            }, {noAck: true});
        });
    });
});