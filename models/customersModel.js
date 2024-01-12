const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

class customersModel{

	static async create(data){
		try{

			const duplicateCheck = await db.query(`SELECT customer_id FROM customers WHERE customer_id=$1`,[data.customer_id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.customer_id}`)
			const result = await db.query(`INSERT INTO customers (customer_id,company_name,contact_name,contact_title,
																	address,city,region,postal_code,country,phone,fax)
												VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
												RETURNING customer_id, contact_name`,
												[data.customer_id,data.company_name,data.contact_name,data.contact_title,
																	data.address,data.city,data.region,data.postal_code,data.country,data.phone,data.fax])
			return result.rows[0]

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
					const result = await db.query('SELECT * FROM customers')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}
CREATE TABLE customers (
    customer_id=$,
    company_name=$ ,
    contact_name=$,
    contact_title=$,
    address=$,
    city=$,
    region=$,
    postal_code=$,
    country=$,
    phone=$,
    fax=$ 
);


		static async getById(Id){
		try{
			   const result = await db.query(`SELECT * FROM customers WHERE customer_id=$1`,[Id])
			   const customer = result.rows[0]

			   if(!customer){
			   	    throw new NotFoundError("CUSTOMER DOES NOT EXIST",404)
			   }
			   return customer 

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
                   const result = await db.query(`
                   								UPDATE customers SET 
                   								
											    company_name=$1 ,
											    contact_name=$2,
											    contact_title=$3,
											    address=$4,
											    city=$5,
											    region=$6,
											    postal_code=$7,
											    country=$8,
											    phone=$9,
											    fax=$10 
                   								WHERE customer_id = $11
                   								RETURNING customer_id,contact_name
						`,[data.company_name,data.contact_name,data.contact_title,
							data.address,data.city,data.region,data.postal_code,data.country,data.phone,data.fax,data.customer_id])

                   const customer = result.rows[0]
                   if(!customer){
                   	    throw new NotFoundError('CUSTOMER NOT AVAILABLE OR SOMETHING')
                   }

                   return customer 

		}catch(error){
			console.log(error)
		}
	}


		static async remove(id){
		try{
				const result = await db.query(`DELETE FROM customers WHERE customer_id = $1
					RETURNING customer_id`,[Id])
				const order = result.rows[0]
				if(!___) throw new NotFoundError(`no customer found:${Id}`)
		}catch(error){
			console.log(error)
		}
	}




}

module.exports = customersModel












