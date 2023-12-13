import * as dao from "./dao.js";

function ArtistRoutes(app) {

    const createArtist = async (req, res) => {
        const artist = req.body;
        const status = await dao.createArtist(artist);
        res.json(status);
    };

    const findArtistById = async (req, res) => {
        try {
            const {artistId} = req.params;
            const artist = await dao.findArtistById(artistId);
            res.json(artist);
        } catch (e) {
            console.log(e);
            res.send(404);
        }
    };

    app.post("/api/artists", createArtist);
    app.get("/api/artists/:artistId", findArtistById);
}

export default ArtistRoutes;