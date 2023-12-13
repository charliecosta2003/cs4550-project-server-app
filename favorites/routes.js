import * as dao from "./dao.js";

function FavoriteRoutes(app) {

    const createFavorite = async (req, res) => {
        const {userId, artistId} = req.body;
        const status = await dao.createFavorite(userId, artistId);
        res.json(status);
    };

    const findAllFavorites = async (req, res) => {
        const favorites = await dao.findAllFavorites();
        res.json(favorites);
    }

    const findFavorite = async (req, res) => {
        const {userId, artistId} = req.query;
        const favorite = await dao.findFavorite(userId, artistId);
        res.json(favorite);
    }

    const findUserFavorites = async (req, res) => {
        const {userId} = req.params;
        try {
            const likes = await dao.findUserFavorites(userId);
            res.json(likes);
        } catch (e) {
            res.sendStatus(404);
        }
    };

    const deleteFavorite = async (req, res) => {
        const {userId, artistId} = req.query;
        const status = await dao.deleteFavorite(userId, artistId);
        res.json(status);
    };

    app.post("/api/favorites", createFavorite);
    app.get("/api/favorites/all", findAllFavorites);
    app.get("/api/favorites", findFavorite);
    app.get("/api/favorites/:userId", findUserFavorites);
    app.delete("/api/favorites", deleteFavorite);
}

export default FavoriteRoutes;