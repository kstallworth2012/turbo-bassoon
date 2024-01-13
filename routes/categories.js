const express = require("express")
const router = express.Router();
const categoriesModel = require('../models/categoriesModel')

router.get('/', async (request,response,next)=>{
	try{
			 const results = await categoriesModel.getAll()
		     return response.json({"Categories":results})

	}catch(e){
	return next(e)
	}
})

router.get('/:id', async function (request,response,next){
	try{
				return response.json({"GET":"BY ID"})
	}catch(e){
	return next(e)
	}
})

                                                       

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