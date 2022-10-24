import { createCustomError } from "../errors/custom-error.js";
import User from "../models/User.js";


//=========================================REGISTER USER===============================================//
const register = async (req, res, next) => {
    try {
        console.log(req.headers)
        //Extract required details from the body of the Request
        const { name, email, password } = req.body;
 
        //Check whether user has provided all the values and if all values are not provided throw an error
        if (!name || !email || !password) {
            return next(createCustomError("Please provide all values", 400))
        }

        //check whether user already exists and if email is already registered throw an error  
        const userAlreadyExists =await User.findOne({ email })
        if (userAlreadyExists) {
            return next(createCustomError("Email already exists", 400))
        }

        //If everything is proper then create the user in database
        const user = await User.create(req.body)

        //Create an unique token for each user [It is required for frontEnd :)]
        const token = user.createJwt()

        //send the required data [password is not required :)] to frontEnd
        res.status(201).json({
            user: {
                email: user.email,
                name: user.name
            },
            token
        })
    } catch (error) {
        next(error)

    }
}
//======================================================================================================//

//=========================================LOGIN USER==================================================//

const login = async (req, res, next) => {
    try {
        //Extract required details from the body of the Request
        const {email, password} = req.body

        //Check whether user has provided all the values and if all values are not provided throw an error
        if ( !email || !password) {
            return next(createCustomError("Please provide all values", 400))
        }

        //check whether user already exists . 
        const user =await User.findOne({ email }).select("+password") // .select() is used bcoz In model we have set select false in password since we do not want it to be returned 

        //if email is not registered throw an error 
        if (!user) {
            return next(createCustomError("Invalid credentials", 401))
        }

        //check Whether the entered password is correct by using the function we created in  User model
        const isPasswordCorrect = await user.comparePassword(password)

        //if the given password does not match with the existing password in the database and if it does not match throw an Unauthenticated error
        if (!isPasswordCorrect) {
            return next(createCustomError("Invalid credentials", 401))
        }

        const token = user.createJwt();
        user.password = undefined

        res.status(200).json({user, token})
    } catch (error) {
        next(error)
    }
    
}
//======================================================================================================//


//==========================================DELETE USER==================================================//
const deleteUser = async (req, res) => {
    console.log('delete User');
    res.send(req.body)

}


export { register, login, deleteUser}