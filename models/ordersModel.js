const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


class OrdersModel{



	static async create(data){
		try{
			   const duplicateCheck = await db.query(`SELECT order_id FROM orders WHERE order_id=$1`)
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.order_id}`)

				const result = await db.query(`INSERT INTO orders (order_id,customer_id,order_date,required_date,
																	shipped_date, ship_via, freight,ship_name, ship_address,
																	ship_city,ship_region,ship_postal_code,ship_country)
																	VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
																	RETURNING order_id
																	`,[data.order_id,data.customer_id,data.order_date,data.required_date,
																	data.shipped_date, data.ship_via, data.freight,data.ship_name, data.ship_address,
																	data.ship_city,data.ship_region,data.ship_postal_code,data.ship_country])
				return result.rows[0]

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
					const result = await db.query('SELECT * FROM orders')
			    return result.rows

		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{
				const result = await db.query(`SELECT * FROM orders WHERE order_id=$1`,[Id])
				const order = result.rows[0]
				if(!order){
					 throw new NotFoundError("order NOT FOUND",404)

				}
				return order
		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			      const result = await db.query(`UPDATE orders SET 
			      								   
												    customer_id =$1,
												    employee_id =$2,
												    order_date =$3,
												    required_date =$4,
												    shipped_date =$5,
												    ship_via =$6,
												    freight =$7,
												    ship_name =$8,
												    ship_address=$9,
												    ship_city =$10,
												    ship_region=$11,
												    ship_postal_code =$12,
												    ship_country =$13
												    WHERE order_id=$14
												    RETURNING order_id
												    `,[data.customer_id,data.order_date,data.required_date,
																	data.shipped_date, data.ship_via, data.freight,data.ship_name, data.ship_address,
																	data.ship_city,data.ship_region,data.ship_postal_code,data.ship_country
																	,data.order_id])
			      const order = result.rows[0]
			      if(!order){
			      	   throw new NotFoundError("NO ORDER WITH THAT ID IS FOUND",404)
			      }
			      return order

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM orders WHERE order_id = $1
					RETURNING order_id`,[Id])
				const order = result.rows[0]
				if(!order) throw new NotFoundError(`no order found:${order_id}`)
		}catch(error){
			console.log(error)
		}
	}



}

module.exports = OrdersModel
















