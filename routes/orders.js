const express = require("express")
const router = express.Router();
const OrdersModel = require('../models/ordersModel')

router.get('/' ,async (request,response,next)=>{
	try{
			  const result = await OrdersModel.getAll()
		     return response.json({"Orders":result})

	}catch(e){
	return next(e)
	}
})

router.get('/:id' ,async function (request,response,next){
	try{
	      const {id} =request.params
				const result = await OrdersModel.getById(id)
				return response.json({"Order":result})
	}catch(e){
	return next(e)
	}
})


// router.post('/' async function (request,response,next){
// 	try{
// 				return response.json({"CREATE EVERYTHING"})
// 	}catch(e){
// 	return next(e)
// 	}
// })


router.patch('/:id', async function (request,response,next){
	try{

		return response.json({"UPDATE ":"BY ID"})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				return response.json({"DELETE ":"BY ID"})
	}catch(e){
	return next(e)
	}
})



module.exports = router 