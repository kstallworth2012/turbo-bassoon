const express = require("express")
const router = express.Router();
const productsModel = require('../models/productsModel')
const customersModel = require("../models/customersModel");

router.get('/', async (request,response,next)=>{
	try{
		     const result = await productsModel.getAll()

		     return response.json({
		     	count: result.length,
		     	"data":result
		     })

	}catch(e){
	return next(e)
	}
})

router.get('/category-suppliers', async (request,response,next)=>{
	try{
		const result = await productsModel.getByCategorySuppliers()
		return response.json({"Products":result})

	}catch(e){
		return next(e)
	}
})


/*
CREATE VIEW ProductsByCategoryAndSupplier AS
SELECT
    P.ProductName,
    C.CategoryName,
    S.CompanyName AS SupplierName,
    P.UnitPrice,
    P.UnitsInStock
FROM Products AS P
JOIN Categories AS C ON P.CategoryID = C.CategoryID
JOIN Suppliers AS S ON P.SupplierID = S.SupplierID;

 */


router.get('/:id', async function (request,response,next){
	try{
				const {id} = request.params;
				const result = await productsModel.getById(id);
				return response.json({"Product":result})
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