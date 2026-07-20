const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const v = new Validator();
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

      // update last login 
      await User.update({last_login_at: new Date()}, {where: {id: user.id}})

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


const addUser = async (req, res) => {
   try {
      const schema = {
         name: {type: "string", min:2, max:100, optional:false},
         username: {type: "string", min:2, max:50, optional:false},
         email: {type: "email", min:2, max:100, optional:false},
         phone: {type: "string", min:2, max:100, optional:false},
         password: {type: "string", min:3, max:255, optional:false}
      }
      
      // validasi data
      const validationResult = v.validate(req.body, schema)
      if (validationResult !== true) {
         return res.status(400).json({
            message: "Validation Failed",
            data: validationResult
         })
      }
      
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const data = {
         role_id: 2,
         name: req.body.name,
         username: req.body.username,
         email: req.body.email,
         phone: req.body.phone,
         password: hashedPassword,
         is_active: true
      }

      
      const existUser = await User.findOne({where: {username: req.body.username}})
      if(existUser) {
         return res.status(400).json({
            message: 'Users already exist'
         });
      }

      const result = await User.create(data)

      return res.status(201).json({
         message: "Success",
         data: result
      })

   } catch (err) {
      res.status(500).json({
         message: 'Something wrong',
         data: err
      })
   }
}


const updateUser = async (req, res) => {
   const {id} = req.params

   try {
      const schema = {
         name: {type: "string", min:2, max:100, optional:false},
         username: {type: "string", min:2, max:50, optional:false},
         email: {type: "email", min:2, max:100, optional:false},
         phone: {type: "string", min:2, max:100, optional:false},
         password: {type: "string", min:3, max:255, optional:false},
         is_active: {type: "boolean", default:true}
      }
      
      // validasi data
      const validationResult = v.validate(req.body, schema)
      if (validationResult !== true) {
         return res.status(400).json({
            message: "Validation Failed",
            data: validationResult
         })
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      
      const data = {
         role_id: 2,
         name: req.body.name,
         username: req.body.username,
         email: req.body.email,
         phone: req.body.phone,
         password: hashedPassword,
         is_active: req.body.is_active
      }


      // update data
      await User.update(data, {where: {id: id}})
      return res.status(200).json({
         message: "Update User Success",
         data: {
            id: id,
            ...data
         }
      })

   } catch (err) {
      res.status(500).json({
         message: 'Something wrong',
         data: err
      })
   }
}


module.exports = {
   signIn,
   addUser,
   updateUser,
}