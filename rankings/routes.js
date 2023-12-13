import * as dao from "./dao.js";

function RankingRoutes(app) {

    const createRanking = async (req, res) => {
        const {userId, artistId, ranking, comment} = req.body;
        const status = await dao.createRanking(userId, artistId, ranking, comment);
        res.json(status);
    };

    const findAllRankings = async (req, res) => {
        const rankings = await dao.findAllRankings();
        res.json(rankings);
    }

    const findRanking = async (req, res) => {
        const {userId, artistId} = req.query;
        const ranking = await dao.findRanking(userId, artistId);
        res.json(ranking);
    }

    const findUserRankings = async (req, res) => {
        const {userId} = req.params;
        try {
            const rankings = await dao.findUserRankings(userId);
            res.json(rankings);
        } catch (error) {
            res.sendStatus(404);
        }
    };

    const findUsersRankings = async (req, res) => {
        const {userId1, userId2, userId3} = req.query;
        const userIds = [];
        if (userId1 !== "null") {
            userIds.push(userId1);
        }
        if (userId2 !== "null") {
            userIds.push(userId2);
        }
        if (userId3 !== "null") {
            userIds.push(userId3);
        }
        console.log(userIds);
        try {
            const rankings = await dao.findUsersRankings(userIds);
            res.json(rankings);
        } catch (error) {
            res.sendStatus(404);
        }
    }

    const findArtistRankings = async (req, res) => {
        const {artistId} = req.params;
        const rankings = await dao.findArtistRankings(artistId);
        res.json(rankings);
    };

    const updateRanking = async (req, res) => {
        const {userId, artistId, ranking, comment} = req.body;
        const status = await dao.updateRanking(userId, artistId, ranking, comment);
        res.json(status);
    }

    const deleteRanking = async (req, res) => {
        const {userId, artistId} = req.query;
        const status = await dao.deleteRanking(userId, artistId);
        res.json(status);
    };

    app.post("/api/rankings", createRanking);
    app.get("/api/rankings/all", findAllRankings);
    app.get("/api/rankings", findRanking);
    app.get("/api/rankings/users/:userId", findUserRankings);
    app.get("/api/rankings/users", findUsersRankings);
    app.get("/api/rankings/artists/:artistId", findArtistRankings);
    app.put("/api/rankings", updateRanking);
    app.delete("/api/rankings", deleteRanking);
}

export default RankingRoutes;