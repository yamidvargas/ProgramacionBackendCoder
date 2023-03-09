import express from "express";
import handlebars from 'express-handlebars';
import bodyParser from "body-parser";
import __dirname from "./dirname.js";
import indexRouter from "./routes/index.routes.js";
import initializePassporr from "./config/pasport.config.js";
import passport from "passport";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import conectMongoDB from "./server/mongo.js";
import session from "express-session";
import MongoStore from "connect-mongo";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
//mongo connects
conectMongoDB();
// initialize passport
initializePassporr();
// Handlebars configuration y middlewares
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
}));
//middlewares
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: process.env.MONGO_DB,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 200,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
// Static route configuration
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
// Express configuration adn middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// Routes configuration 
// views
indexRouter(app);
//server
app.listen(PORT, () => {
    console.log(`Server running on port" ${PORT}`);
});
