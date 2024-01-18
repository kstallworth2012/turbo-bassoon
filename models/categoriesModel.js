const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

class categoriesModel{

	// static async create(data){
	// 	try{
	// 		const duplicateCheck = await db.query(`SELECT category_id FROM orders WHERE category_id=$1`)
	// 		   	if(duplicateCheck.rows[0])
	// 					throw new BadRequestError(`Duplicate Order details: ${data.category_id}`)


	// 	}catch(error){
	// 		console.log(error)
	// 	}
	// }

	static async getAll(){
		try{
					const result = await db.query(`SELECT * FROM categories`)
					return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{
					const result = await db.query(`SELECT * FROM categories WHERE category_id=$1`,[Id])

					const category = result.rows[0]

					if(!category){
							throw new NotFoundError(`Category Not Found ${Id}`)
					}

					return category
		}catch(error){
			console.log(error)
		}
	}


	// 	static async update(){
	// 	try{

	// 	}catch(error){
	// 		console.log(error)
	// 	}
	// }


	// 	static async remove(Id){
	// 	try{
	// 			const result = await db.query(`DELETE FROM _____ WHERE ___ = $1
	// 				RETURNING ___`,[Id])
	// 			const order = result.rows[0]
	// 			if(!___) throw new NotFoundError(`no ___ found:${___}`)

	// 	}catch(error){
	// 		console.log(error)
	// 	}
	// }





}
module.exports = categoriesModel


