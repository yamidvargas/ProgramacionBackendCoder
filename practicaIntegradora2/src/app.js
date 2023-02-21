import express from "express";
import handlebars from 'express-handlebars';
import bodyParser from "body-parser";
import __dirname from "./dirname.js";
import indexRouter from "./routes/index.routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectDB, MONGOOSE_URI } from "./server/mongo.js";
import initializePassporr from "./config/pasport.config.js";
import passport from "passport";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//const
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
const SESSION_SECRET = "sessionSecret";
const COOKIE_SECRET = 'myCookieCoder';
// initialize passport
initializePassporr();
//mongo connects
connectDB();
// Handlebars configuration y middlewares
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
}));
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGOOSE_URI,
        dbName: "ecommerce",
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 200,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// Static route configuration
app.use(express.static(__dirname + "/public"));
// Express configuration adn middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
// BodyParser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes configuration 
// views
indexRouter(app);
//server
app.listen(PORT, () => {
    console.log(`Server running on port" ${PORT}`);
});
