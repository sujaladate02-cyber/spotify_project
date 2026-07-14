const jwt = require("jsonwebtoken");


async function authArtist(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;

        next()

    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // console.log("Cookies:", req.cookies);
        // console.log("Token:", token);

        // console.log(req.cookies);
        // console.log(req.cookies.token);


        if (decoded.role !== "user") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;

        next()


    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

    // console.log("Cookies:", req.cookies);

}

module.exports = { authArtist, authUser }


