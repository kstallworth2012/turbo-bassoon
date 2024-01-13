const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

class shippersModel{

	static async create(data){
		try{  

			  const duplicateCheck = await db.query(`SELECT order_id FROM orders WHERE order_id=$1`)
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.order_id}`)

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
						const result = await db.query('SELECT * FROM shippers')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}
// CREATE TABLE shippers (
//     shipper_id smallint NOT NULL,
//     company_name character varying(40) NOT NULL,
//     phone character varying(24)
// );



		static async getById(){
		try{

		}catch(error){
			console.log(error)
		}
	}


		static async update(){
		try{

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM _____ WHERE ___ = $1
					RETURNING ___`,[Id])
				const order = result.rows[0]
				if(!___) throw new NotFoundError(`no ___ found:${___}`)

		}catch(error){
			console.log(error)
		}
	}




}

module.exports = shippersModel



