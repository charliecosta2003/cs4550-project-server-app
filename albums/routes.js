import * as dao from "./dao.js";

function AlbumRoutes(app) {

        const createAlbum = async (req, res) => {
            const album = req.body;
            const status = await dao.createAlbum(album);
            res.json(status);
        };

        const findAlbumById = async (req, res) => {
            try {
                const {albumId} = req.params;
                const album = await dao.findAlbumById(albumId);
                res.json(album);
            } catch (e) {
                console.log(e);
                res.send(404);
            }
        };

        app.post("/api/albums", createAlbum);
        app.get("/api/albums/:albumId", findAlbumById);
}

export default AlbumRoutes;