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