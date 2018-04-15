const express = require ( "express" );
const bodyParser = require ( "body-parser" );

let app = express();
app.use ( bodyParser.json() );

/* Routes */
app.get ( "/reviews/:id", async ( req, res ) => {
    let itemid = req.params.id;
    let ret = undefined; //await getReviews(itemid);
    res.status ( 200 ).send ( ret );
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

app.post ( "/login", async ( req, res ) => {
    let body = req.bod;
    let username = body.username;
    let hPass = body.password;
    let check = undefined;
    try {
        check = await validate ( username, hPass );
    } catch (e) {
        res.status ( 400 ).send ( e );
    }
    
});

app.listen ( 5000, () => {
    console.log ( "Server running on http://localhost:5000" );
});