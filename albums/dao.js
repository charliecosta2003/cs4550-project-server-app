import model from "./model.js";

export const createAlbum = (album) => model.create(album);
export const findAlbumById = (albumId) => model.findById(albumId);