import model from "./model.js";

export const createRanking = (userId, artistId, ranking, comment) => model.create({
    user: userId,
    artist: artistId,
    ranking: ranking,
    comment: comment
});

export const findAllRankings = () => model.find().populate("user").populate("artist").populate({
    path: "ranking",
    model: "albums"
}).exec();

export const findRanking = (userId, artistId) => model.findOne({user: userId, artist: artistId}).populate({
    path: "ranking",
    model: "albums"
}).exec();

export const findUserRankings = (userId) => model.find({user: userId}).populate("artist").populate({
    path: "ranking",
    model: "albums"
}).exec();

export const findUsersRankings = (userIds) => model.find({user: {$in: userIds}}).populate("artist").populate("user").populate({
    path: "ranking",
    model: "albums"
}).exec();

export const findArtistRankings = (artistId) => model.find({artist: artistId}).populate("user").populate({
    path: "ranking",
    model: "albums"
}).exec();

export const updateRanking = (userId, artistId, ranking, comment) => model.updateOne({user: userId, artist: artistId}, {
    ranking: ranking,
    comment: comment
});

export const deleteRanking = (userId, artistId) => model.deleteOne({user: userId, artist: artistId});