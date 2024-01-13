const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


class productsModel{


	static async create(data){
		try{
						const duplicateCheck = await db.query(`SELECT order_id FROM orders WHERE order_id=$1`)
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.order_id}`)
					const result = await db.query(`INSERT INTO products(product_id,product_name,supplier_id,category_id,
																quantity_per_unit,unit_price,units_in_stock,units_on_order,
																reorder_level,discontinued) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
													RETURNING product_id,product_name`,[data.product_id,data.product_name,data.supplier_id,data.category_id,
																data.quantity_per_unit,data.unit_price,data.units_in_stock,data.units_on_order,
																data.reorder_level,data.discontinued])

					return result.rows[0]

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
					const result = await db.query('SELECT * FROM products')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}
// CREATE TABLE products (
//     product_id smallint NOT NULL,
//     product_name character varying(40) NOT NULL,
//     supplier_id smallint,
//     category_id smallint,
//     quantity_per_unit character varying(20),
//     unit_price real,
//     units_in_stock smallint,
//     units_on_order smallint,
//     reorder_level smallint,
//     discontinued integer NOT NULL
// );

		static async getById(Id){
		try{
					const result = await db.query('SELECT * FROM products WHERE product_id=$1',[Id])
					const product = result.rows[0]

					if(!product){
						  throw new NotFoundError(`Product not found ${product_id}`)
					}
					return product 
		}catch(error){
			console.log(error)
		}
	}


		static async update(){
		try{
					       const result = await db.query(`
			                        UPDATE products SET
								    product_name =$1,
								    supplier_id =$2,
								    category_id =$3,
								    quantity_per_unit =$4,
								    unit_price real=$5,
								    units_in_stock =$6,
								    units_on_order =$7,
								    reorder_level =$8,
								    discontinued =$9
								    WHERE product_id=$10
								    RETURNING product_id,product_name`
								    ,[data.product_name,data.supplier_id,data.category_id,
																data.quantity_per_unit,data.unit_price,data.units_in_stock,data.units_on_order,
																data.reorder_level,data.discontinued,data.product_id])

					       const product = result.rows[0]
					       if(!product){
					       	    throw NotFoundError(' no product found error ')

					       }

					       return product

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM products WHERE product_id = $1
					RETURNING product_id`,[Id])
				const product = result.rows[0]
				if(!product) throw new NotFoundError(`no product found:${product_id}`)
		}catch(error){
			console.log(error)
		}
	}





}

module.exports = productsModel











