import { connect } from "@/lib/mongo/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        const validPassword = await bcryptjs.compare
        (password, user.hashed_password)
        if(!validPassword){
            return NextResponse.json({error: "Invlid password"}, {status: 400})
        }

//Création du JWT

        const tokenData = {
            id: user._id,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        // Create a JSON response indicating successful login
        const response = NextResponse.json({
            message: "Connexion réussie",
            success: true,
        })

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}