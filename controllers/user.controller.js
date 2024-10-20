import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;
        if (!fullname || !email || !password || !phonenumber || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: true
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role,
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "incorrect email or password",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false,
            });
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesnot exist with current role",
                success: false,
            })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role:user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 *60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error)

    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;
        const file = req.file;
        
        //cloudanary ayega
        let skillsArray;
        if(skills){
         skillsArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        //updating data
        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phonenumber) user.phonenumber=phonenumber
        if(bio) user.bio=bio
        if(skills) user.skills=skillsArray
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            profile: user.profile
        }
        return res.status(200).json({
            message: "profile updatd successfully",
            user,
            success: true
        })

    }
    catch (error) {
        console.log(error);

    }
}