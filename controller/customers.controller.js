const { Customers } = require('../models')
const Validator = require('fastest-validator')
const v = new Validator();

const getAllCustomer = async (req, res) => {
   try {
      const data = await Customers.findAll({attributes: { exclude: ['createdAt'] }})
      return res.status(200).json({
         message: "Get All Customer",
         data: data
      })
   } catch (err) {
      return res.status(500).json({
         message: 'Error Server',
         error: err.message 
      });
   }
}

const getCustomerById = async (req, res) => {

}

const createCustomer = async (req, res) => {
   const userId = req.user.userId;
   console.log(userId)
   try {
      const data = {
         "no_wa": req.body.no_wa,
         "name": req.body.name,
         "address": req.body.address,
         "email": req.body.email,
         "membership_tier_id": req.body.membership_tier_id,
         "total_spending": 0,
         "registered_by": userId,
         createdAt: new Date(),
         updatedAt: new Date()
      }

      const schema = {
         no_wa: {type: "string", min: 5, max:20, optional: false},
         name: {type:"string", min: 2, max: 100, optional: false},
         address: {type: "string", min:3, max: 225, optional: true},
         email: {type:"email", min:3, max:100, optional: true},
         membership_tier_id: {type:"number", optional: false}
      }

      const validationResult = v.validate(data, schema)

      if (validationResult !== true){
         return res.status(400).json({
            message: 'Validation Result',
            data: validationResult
         })
      }

      const existCustomer = await Customers.findOne({where: {no_wa: req.body.no_wa}})
      if(existCustomer) {
         return res.status(400).json({
            message: 'Customer already exist'
         });
      }

      const result = await Customers.create(data)

      return res.status(400).json({
         message: "Success",
         data: result
      })
   } catch (err) {
      return res.status(500).json({
         message: 'Error Server',
         error: err.message 
      });
   }
}

const updateCustomer = async (req, res) => {

}

const destroyCustomer = async (req, res) => {

}


module.exports = {
   getAllCustomer,
   getCustomerById,
   createCustomer,
   updateCustomer,
   destroyCustomer
}