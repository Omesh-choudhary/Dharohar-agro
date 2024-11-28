import z from "zod"

const signUpSchema = z.object({
    username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at lest of 3 chars." })
    .max(255, { message: "Name must not be more than 255 characters" }),
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(25,{message:"password must not be greater than 25 characters "}),
    Verificationcode: z
    .string({ required_error: "OTP is required" })
    .trim()
   
})

export default signUpSchema