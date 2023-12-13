import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import SpotifyRoutes, {generateAccessToken} from "./spotify/routes.js";
import UserRoutes from "./users/routes.js";
import FollowRoutes from "./follows/routes.js";
import FavoriteRoutes from "./favorites/routes.js";
import ArtistRoutes from "./artists/routes.js";
import AlbumRoutes from "./albums/routes.js";
import RankingRoutes from "./rankings/routes.js";

const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/project';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));

app.use(express.json());

SpotifyRoutes(app);
UserRoutes(app);
FollowRoutes(app);
FavoriteRoutes(app);
ArtistRoutes(app);
AlbumRoutes(app);
RankingRoutes(app);

generateAccessToken();
const tokenRenewalInterval = setInterval(generateAccessToken, 3600000);

app.listen(4000);
