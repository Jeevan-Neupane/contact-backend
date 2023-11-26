import jwt from "jsonwebtoken"




 const authToken = function (req, res, next) {
    //*Get the token from the header

    const token = req.header('x-auth-token');

    //*Check if not token

    if (!token) {
        return res.status(401).json({
            message: "No token ,authorization denied"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Token is not valid"
        })
    }
}

export default authToken;