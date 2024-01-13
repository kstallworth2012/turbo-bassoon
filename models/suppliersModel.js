const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


class suppliersModel{


	static async create(){
		try{
					const duplicateCheck = await db.query(`SELECT suppler_id FROM orders WHERE supplier_id=$1`)
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.order_id}`)

				 const result = await db.query(`INSERT INTO suppliers (supplier_id,company_name,
				 									contact_name,contact_title,address,city,region,postal_code,country,phone,fax,homepage)
				 									VALUES()
				 									RETURNING supplier_id,company_name
				 									`,[data.supplier_id,data.company_name,
				 									data.contact_name,data.contact_title,data.address,data.city,data.region,
				 									data.postal_code,data.country,data.phone,data.fax,data.homepage])
				 const newSupplier = result.rows[0]
				 return newSupplier

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM suppliers')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}

// CREATE TABLE suppliers (
//     supplier_id smallint NOT NULL,
//     company_name character varying(40) NOT NULL,
//     contact_name character varying(30),
//     contact_title character varying(30),
//     address character varying(60),
//     city character varying(15),
//     region character varying(15),
//     postal_code character varying(10),
//     country character varying(15),
//     phone character varying(24),
//     fax character varying(24),
//     homepage text
// );
		static async getById(Id){
		try{
			   const result = await db.query('SELECT * FROM suppliers WHERE supplier_id=$1',[Id])
			   const supplier = result.rows[0]
			   if(!supplier){
			   	   throw new NotFoundError(`No supplier found ${supplier_id}`)
			   }
			   return supplier

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{

					const result = await db.query(`
							UPDATE suppliers
							SET
						    company_name =$1,
						    contact_name =$2,
						    contact_title =$3,
						    address  =$4,
						    city  =$5,
						    region =$6,
						    postal_code  =$7,
						    country =$8,
						    phone =$9,
						    fax =$10,
						    homepage =$11
						    WHERE supplier_id =$12,
						    `,[data.company_name,
				 									data.contact_name,data.contact_title,data.address,data.city,data.region,
				 									data.postal_code,data.country,data.phone,data.fax,data.homepage,data.supplier_id])
					const updatedSupplier = result.await.rows[0]
					if(!updatedSupplier){
						   throw new NotFoundError(`supplier not found: ${supplier_id}`)
					}

					return updatedSupplier


		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM suppliers WHERE supplier_id = $1
					RETURNING supplier_id`,[Id])
				const supplier = result.rows[0]
				if(!supplier) throw new NotFoundError(`no supplier found:${supplier_id}`)

		}catch(error){
			console.log(error)
		}
	}



}
module.exports = suppliersModel














