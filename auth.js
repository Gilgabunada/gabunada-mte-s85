const jwt = require("jsonwebtoken");

module.exports.verify = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ auth: "Failed", message: "No token provided"});
    }

    const token = authHeader.startsWith("Bearer")
        ? authHeader.slice(7).trim()
        : authHeader.trim();
    if(!token){
        return res.status(401).send({ auth: "Failed", message: "Invalid token format"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(403).send({auth: "Failed", message: "Invalid or Expired token"});
        }

        req.user = decoded;
        next();
    });
};