import * as dao from "./dao.js";

function FollowRoutes(app) {

    const createFollow = async (req, res) => {
        const {followerId, followingId} = req.body;
        const status = await dao.createFollow(followerId, followingId);
        res.json(status);
    };

    const findFollow = async (req, res) => {
        const {followerId, followingId} = req.query;
        try {
            const follow = await dao.findFollow(followerId, followingId);
            res.json(follow);
        } catch (error) {
            res.sendStatus(400);
        }
    };

    const findUserFollowers = async (req, res) => {
        const {userId} = req.params;
        try {
            const followers = await dao.findUserFollowers(userId);
            res.json(followers);
        } catch (e) {
            res.sendStatus(404);
        }
    };

    const findUserFollowing = async (req, res) => {
        const {userId} = req.params;
        try {
            const following = await dao.findUserFollowing(userId);
            res.json(following);
        } catch (e) {
            res.sendStatus(404);
        }
    };

    const deleteFollow = async (req, res) => {
        const {followerId, followingId} = req.query;
        const status = await dao.deleteFollow(followerId, followingId);
        res.json(status);
    };

    app.post("/api/follows", createFollow);
    app.get("/api/follows", findFollow);
    app.get("/api/follows/:userId/followers", findUserFollowers);
    app.get("/api/follows/:userId/following", findUserFollowing);
    app.delete("/api/follows", deleteFollow);
}

export default FollowRoutes;