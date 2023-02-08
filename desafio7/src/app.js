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
//const
const app = express();
const PORT = 8080;
// initialize passport
initializePassporr();
//mongo connect
connectDB();
// Express configuration adn middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// BodyParser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    secret: "perros",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// Static route configuration
app.use(express.static(__dirname + "/public"));
// Handlebars configuration y middlewares
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
}));
// Routes configuration 
// views
indexRouter(app);
//server
app.listen(PORT, () => {
    console.log(`Server running on port" ${PORT}`);
});
