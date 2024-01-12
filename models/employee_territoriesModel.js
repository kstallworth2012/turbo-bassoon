const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')



    employee_id smallint NOT NULL,
    territory_id character varying(20) NOT NULL
class Employee_TerritoriesModel {

	static async create(){
		try{
			    const result = await db.query(`INSERT INTO employee_territories (employee_id,territory_id)
			    								VALUES($1,$2) RETURNING employee_id`,[data.employee_id,data.territory_id] )
			    return result.rows[0]

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{

			    const result = await db.query('SELECT * FROM employee_territories')
			    return result.rows

		}catch(error){
			console.log(error)
		}
	}


		static async getById(employee_id){
		try{
				const result = await db.query(`SELECT * FROM employee_territories
						 WHERE employee_id=$1`,[employee_id])
			    const employee_territory = result.rows[0]

			    if(!employee_territory){
			    	throw new NotFoundError(`NO employee territory FOUND`)
			    }
			    return employee_territory

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			  const result = await(`UPDATE employee_territories 
			  								SET 
			  								territory_id=$1
			  								WHERE employee_id=$2`,[data.territory_id,data.employee_id])

		}catch(error){
			console.log(error)
		}
	}


		static async remove(id){
		try{
			result = await db.query(`DELETE FROM employee_territories WHERE employee_id =$1`,[id])
			const employee_territory = result.rows[0]

			if(!employee_territory) throw new NotFoundError(`No such employee_territory found: ${Id}`)
		}catch(error){
			console.log(error)
		}
	}

		static async save(){
		try{

		}catch(error){
			console.log(error)
		}
	}

}

module.exports = Employee_TerritoriesModel









