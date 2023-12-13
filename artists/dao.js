import model from "./model.js";

export const createArtist = (artist) => model.create(artist);
export const findArtistById = (artistId) => model.findById(artistId);
