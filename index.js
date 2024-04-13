const express = require('express');
const app = express();
const port = 7000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const authRouteURL = require('./src/routes/user-routes');
app.use('/auth', authRouteURL);

const storyRouteURL = require('./src/routes/story-routes');
app.use('/story', storyRouteURL);

app.listen(port,() => {
    console.log(`listening on port${port}`);
})