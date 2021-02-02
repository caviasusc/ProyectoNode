const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
require ("dotenv").config()


const app = express();

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());


// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ewgei.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))

// import routes
const authRoute = require('./routes/auth')
const token_valid = require('./middlewares/validate_token')
const userRoute = require('./routes/user')
const docRouter = require('./routes/doc')

// route middlewares
const cors = require('cors')
var cosrOptions = {
    origin: `${process.env.CORS_origins}`,
    optionSuccessStatus: 200
}
app.use(cors(cosrOptions));
app.use('/api/user', authRoute);
app.use('/profile', token_valid, userRoute);
app.use('/document', token_valid, docRouter);
app.use('/uploads/*', token_valid)
app.use('/uploads', express.static('uploads'))  

app.get('/', (req, res) => {
    res.json({
        status: true,
        messsage: 'working'
    })
});

// iniciar server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})