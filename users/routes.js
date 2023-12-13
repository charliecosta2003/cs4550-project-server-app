import * as dao from "./dao.js";

function UserRoutes(app) {

    const login = async (req, res) => {
        const {username, password} = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (!currentUser) {
            res.status(400).json({message: "Incorrect username or password. Please try again."});
        } else {
            req.session['currentUser'] = currentUser;
            res.json(currentUser);
        }
    };

    const register = async (req, res) => {
        const existingUser = await dao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.status(400).json({message: "Username already taken. Please try again."});
        } else {
            const newUser = await dao.createUser(req.body);
            req.session['currentUser'] = newUser;
            res.json(newUser);
        }
    };

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = (req, res) => {
        res.json(req.session['currentUser']);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        try {
            const user = await dao.findUserById(req.params.userId);
            res.json(user);
        } catch (e) {
            res.sendStatus(404);
        }
    };

    const updateUser = async (req, res) => {
        const {userId} = req.params;
        const {signedIn} = req.query;
        const status = await dao.updateUser(userId, req.body);
        if (signedIn === 'true') {
            req.session['currentUser'] = await dao.findUserById(userId);
        }
        res.json(status);
    };

    const deleteUser = async (req, res) => {
        const {userId} = req.params;
        const status = await dao.deleteUser(userId);
        res.json(status);
    };

    app.post("/api/users/login", login);
    app.post("/api/users/register", register);
    app.post("/api/users/logout", logout);
    app.post("/api/users/profile", profile);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
}

export default UserRoutes;