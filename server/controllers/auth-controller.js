const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

class AuthController {
    
    static async signUp (req, res){
        const {username, password} = req.body;

        const usernameSame = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if(usernameSame){
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const createUser = await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        });

        if(createUser){
            return res.status(201).json({
                message: "User created successfully"
            });
        }
    }



    static async signIn(req, res){
        const {username, password} = req.body;

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }


        if(user.password !== password){
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            message: "User logged in successfully",
            data: user
        });
    }

}


module.exports = AuthController