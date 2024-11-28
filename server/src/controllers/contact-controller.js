import  {Contact}  from "../models/contact.model.js"

const contactForm =  async (req,res)=>{
 
    try {
        const response = req.body
       await Contact.create(response)
       res.status(201).json({message:"message sent successfully"})
    } catch (error) {
        console.log(error);
        
       res.status(501).json({message:"message not sent"}) 
    }
}


export default contactForm