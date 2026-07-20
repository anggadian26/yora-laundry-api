const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

const signIn = async (req, res, next) => {
   try {
      const { username, password } = req.body

      const user = await User.findOne({ where: {username}})

      // Validasi mencari data user 
      if(!user) {
         return res.status(401).json({message: "Data not Found"})
      }
      // validasi user aktif
      if(user.is_active == false) {
         return res.status(401).json({message: "User not active"})
      }
      // validasi password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if(!isPasswordValid){
         return res.status(401).json({ status: "FAILED", message: "Wrong Password" });
      }

      const payload = {
         username: user.username,
         email: user.email,
         userId: user.id
      }

      const token = jwt.sign(payload, JWT_SECRET)

      return res.status(200).json({
         status: "SUCCESS",
         message: "Success Login",
         token
      })

   } catch (err) {
      return res.status(500).json({
         message: 'Login failed',
         error: err.message 
      });
   }
}


module.exports = {
   signIn,
}