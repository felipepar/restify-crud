const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        {useNewUrlParser: true}
    )
});
console.log('teste')
const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    console.log('connected')
    require('./routes/beneficiaries')(server)
    console.log(`Server started on port ${config.PORT}`)
});