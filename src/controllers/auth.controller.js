import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";

class UserControllers {


    async getUser(req, res) {

        try {
            const user = await User.findById(req.id).select("-password -terms");
            res.status(200).json({
                user
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }


    }


    async userRegistration(req, res) {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(404).json({
                error: errors.array()
            })
        }

        const { username, email, password, password_confirmation } = req.body;

        try {
            const user = await User.findOne({ email });

            if (user) {
                return res.status(404).json({
                    message: "Email Already exist"
                })
            }

            if (password !== password_confirmation) {

                return res.status(404).json({
                    message: "Password is not matched"
                })
            }

            const newUser = new User({
                username, email, password
            })


            await newUser.save();

            const jwtToken = await newUser.generateToken();

            res.status(200).json({
                token: jwtToken
            })
        } catch (error) {

            res.status(500).json({
                message: "Internal Server Error"
            })

        }



    }

    async userLogin(req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(404).json({
                error: errors.array()
            })
        }
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    message: "User Doesn't exist"
                })
            }

            const validatePassword = await user.isPasswordCorrect(password);
            console.log(validatePassword);

            if (!validatePassword) {
                return res.status(404).json({
                    message: "Password is incorrect"
                })
            }


            const token = await user.generateToken();

            res.status(200).json({
                token
            })


        } catch (error) {

            res.status(500).json({
                message: "Internal Sever error"
            })

        }




    }
}

const userControl = new UserControllers();

export default userControl;