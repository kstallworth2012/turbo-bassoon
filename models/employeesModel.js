const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


class employeesModel{

	static async create(data){
		try{
			const duplicateCheck = await db.query(`SELECT employee_id FROM employees WHERE employee_id=$1`,[data.employee_id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate employee details: ${data.employee_id}`)

			const result = await db.query(`INSERT INTO employees (employee_id,last_name,first_name,title,title_of_courtesy,
																birth_date,hire_date,address,city,region,postal_code,country,
																home_phone,extension,photo,notes,reports_to,photo_path)
																VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
																RETURNING employee_id,last_name
																`,[data.employee_id,data.last_name,data.first_name,data.title,
																	data.title_of_courtesy,
																data.birth_date,data.hire_date,data.address,data.city,data.region,
																data.postal_code,data.country,
																data.home_phone,data.extension,data.photo,data.notes,data.reports_to,data.photo_path])
			const newEmployee = result.rows[0]

			return newEmployee


		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
					const result = await db.query('SELECT * FROM employees')
					return result.rows
		}catch(error){
			console.log(error)
		}
	}



// CREATE TABLE employees (
//     employee_id smallint NOT NULL,
//     last_name character varying(20) NOT NULL,
//     first_name character varying(10) NOT NULL,
//     title character varying(30),
//     title_of_courtesy character varying(25),
//     birth_date date,
//     hire_date date,
//     address character varying(60),
//     city character varying(15),
//     region character varying(15),
//     postal_code character varying(10),
//     country character varying(15),
//     home_phone character varying(24),
//     extension character varying(4),
//     photo bytea,
//     notes text,
//     reports_to smallint,
//     photo_path character varying(255)
// );


		static async getById(Id){
		try{
			    const result = await db.query(`SELECT * FROM employees WHERE employee_id =$1`,[Id])


			    const employee = result.rows[0]

			    if(!employee){
			    	throw new NotFoundError(`Employee Not Found ${Id}`)
			    }


			    return employee

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{

				const result = await db.query(`UPDATE employees SET
					    last_name=$1,
					    first_name=$2,
					    title=$3,
					    title_of_courtesy=$4,
					    birth_date=$5,
					    hire_date=$6,
					    address=$7,
					    city=$8,
					    region=$9,
					    postal_code=$10,
					    country=$11,
					    home_phone=$12,
					    extension=$13,
					    photo=$14,
					    notes=$15,
					    reports_to=$16,
					    photo_path=$17
					    WHERE employee_id=$18
					    RETURNING employee_id
					    `,[data.last_name,data.first_name,data.title,
																	data.title_of_courtesy,
																data.birth_date,data.hire_date,data.address,data.city,data.region,
																data.postal_code,data.country,
																data.home_phone,data.extension,
																data.photo,data.notes,data.reports_to,
																data.photo_path,data.employee_id])

				const updatedEmp= result.rows[0]
				if(!employee){
					throw new NotFoundError(`no employee found ${data.employee_id}`)
				}

				return updatedEmp

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
					const result = await db.query(`DELETE FROM employees WHERE employee_id = $1
					RETURNING employee_id`,[Id])
				const employee = result.rows[0]
				if(!employee) throw new NotFoundError(`no employee found:${employee_id}`)
		}catch(error){
			console.log(error)
		}
	}








}

module.exports = employeesModel