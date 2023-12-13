import axios from "axios";

const client_id = "268679c9d8dc499480d540b22eb40462";
const client_secret = "b23210e5a5154554a6f24f24a1f94059";

let accessToken = '';

export const generateAccessToken = async () => {
    try {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            params: {
                grant_type: 'client_credentials'
            }
        };

        const response = await axios(authOptions);
        accessToken = response.data.access_token;
    } catch (error) {
        console.log("Something went wrong");
    }
};

function SpotifyRoutes(app) {

    const search = async (req, res) => {
        const query = req.query.query;
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                q: query,
                type: 'artist'
            },
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        res.json(response.data);
    }

    const getArtistAlbums = async (req, res) => {
        const {artistId} = req.params;
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
                params: {
                    include_groups: 'album',
                    limit: '50'
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            res.json(response.data);
        } catch (error) {
            res.sendStatus(404);
        }
    }

    const getArtistDetails = async (req, res) => {
        const {artistId} = req.params;
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            res.json(response.data);
        } catch (error) {
            res.sendStatus(404);
        }
    }

    const getAlbumDetails = async (req, res) => {
        const {albumId} = req.params;
        try {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            res.json(response.data);
        } catch (error) {
            res.sendStatus(404);
        }
    }

    const getRelatedArtists = async (req, res) => {
        const {artistId} = req.params;
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            res.json(response.data);
        } catch (error) {
            res.sendStatus(404);
        }
    }

    app.get('/api/spotify/search', search);
    app.get('/api/spotify/details/:artistId/albums', getArtistAlbums);
    app.get('/api/spotify/details/:artistId', getArtistDetails);
    app.get('/api/spotify/albums/:albumId', getAlbumDetails);
    app.get('/api/spotify/details/:artistId/related', getRelatedArtists);
}

export default SpotifyRoutes;