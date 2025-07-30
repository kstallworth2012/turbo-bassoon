const express = require("express")
const router = express.Router();
const employeesModel = require('../models/employeesModel')

router.get('/' ,async (request,response,next)=>{
	try{
		     const result =await employeesModel.getAll()

		     return response.json({"Employees":result})

	}catch(e){
	return next(e)
	}
})

router.get('/:id' ,async function (request,response,next){
	try{

				const {id} = request.params;
				const result = await employeesModel.getById(id);
				return response.json({"Employee":result})
	}catch(e){
	return next(e)
	}
})


// router.post('/', async function (request,response,next){
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