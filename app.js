import express from 'express';
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);

const client_id = "268679c9d8dc499480d540b22eb40462";
const client_secret = "b23210e5a5154554a6f24f24a1f94059";

let accessToken = ''; // Store the access token globally

const generateAccessToken = async () => {
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
        // console.error('Error generating access token:', error.message);
        console.log("Something went wrong");
    }
};

generateAccessToken();
const tokenRenewalInterval = setInterval(generateAccessToken, 3600000);

app.get('/search', async (req, res) => {
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
});

app.get('/details/:id', async (req, res) => {
    const {id} = req.params;
    const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        params: {
            include_groups: 'album',
            limit: '50'
        },
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    res.json(response.data);
});

app.listen(4000);
