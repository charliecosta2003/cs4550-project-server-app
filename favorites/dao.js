import model from "./model.js";

export const createFavorite = (userId, artistId) => model.create({user: userId, artist: artistId});
export const findAllFavorites = () => model.find().populate("artist").exec();
export const findFavorite = (userId, artistId) => model.findOne({user: userId, artist: artistId});
export const findUserFavorites = (userId) => model.find({user: userId}).populate("artist").exec();
export const deleteFavorite = (userId, artistId) => model.deleteOne({user: userId, artist: artistId});
