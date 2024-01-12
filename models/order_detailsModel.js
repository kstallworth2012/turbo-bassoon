const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

// CREATE TABLE order_details (
//     order_id smallint NOT NULL,
//     product_id smallint NOT NULL,
//     unit_price real NOT NULL,
//     quantity smallint NOT NULL,
//     discount real NOT NULL
// );
class order_detailsModel {


	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT order_id FROM order_details WHERE order_id=$1`,[data.order_id])
					if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.order_id}`)
					const result = await db.query(`INSERT INTO order_details (oder_id,product_id,unit_price,quantity,discount)
						VALUES($1,$2,$3,$4,$5) RETURNING order_id`,
						[data.order_id,data.product_id,data.unit_price,data.quantity,data.discount])
					return result.rows[0]

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM order_details')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(id){
		try{
					const result = await db.query(`SELECT * FROM order_details WHERE order_id=$1`,[id])

					const order_detail = result.rows[0]
					if(!order_detail){
	   	  				 throw new NotFoundError("order_detail NOT FOUND",404)
	   	  			}
	   	  				return order_detail
		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
				const result = await db.query(`UPDATE order_details SET 

													  product_id=$1,
													  unit_price=$2,
													  quantity=$3,
													  discount=$4
													  WHERE order_id = $5
													  RETURNING order_id`,[data.product_id,data.unit_price,
													  		data.quantity,data.discount,data.order_id])
				if (result.rows.length === 0){
					throw new ExpressError("order_details NOT FOUND",404)
				}
				return result.rows[0]
		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
            const result = await db.query(`DELETE FROM order_details WHERE Id=$1`,[Id])

            const order_details = result.rows[0]

            if(!order_details) throw new NotFoundError(`No such order detail information found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}

		

}











module.exports = order_detailsModel








