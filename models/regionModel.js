const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

class regionModel{

	// static async create(){
	// 	try{
	// 		const duplicateCheck = await db.query(`SELECT order_id FROM orders WHERE order_id=$1`)
	// 		   	if(duplicateCheck.rows[0])
	// 					throw new BadRequestError(`Duplicate Order details: ${data.order_id}`)


	// 	}catch(error){
	// 		console.log(error)
	// 	}
	// }

	static async getAll(){
		try{
			const result = await db.query('SELECT * FROM region')
			return result.rows

		}catch(error){
			console.log(error)
		}
	}


		static async getById(id){
		try{
					const result = await db.query(`SELECT * FROM region WHERE region_id=$1`,[id])
					const region = result.rows[0]
					if(!region){
						throw new NotFoundError(`Region Not Found ${id}`)

					}

					return region

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
module.exports = regionModel