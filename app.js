/*
				NORTHWIND BACKEND 
*/
const express = require("express")
const app = express()
const ExpressError = require('./expressError')
const cors = require("cors")

/*
const employee_territoriesRoutes    = require('./routes/employeeTerritories');
const order_detailsRoutes    = require('./routes/orderDetails')
const ordersRoutes    = require('./routes/orders')
const customersRoutes    = require('./routes/customers')
const productsRoutes    = require('./routes/products')
const shippersRoutes    = require('./routes/shippers')
const suppliersRoutes = require('./routes/suppliers')
const territoriesRoutes    = require('./routes/territories')
const us_statesRoutes    = require('./routes/us_states')
const categoriesRoutes    = require('./routes/categories')
const regionRoutes    = require('./routes/region')
const employeesRoutes    = require('./routes/employees')
*/

app.use(cors())
app.use(express.json())

/*

app.use("/employee_territories",employee_territoriesRoutes);
app.use("/order-details",order_detailsRoutes);
app.use("/orders",ordersRoutes);
app.use("/customers",customersRoutes);
app.use("/products",productsRoutes);
app.use("/shippers",shippersRoutes);
app.use("/suppliers",suppliersRoutes);
app.use("/territories",territoriesRoutes);
app.use("/us_states",us_statesRoutes);
app.use("/categories",categoriesRoutes);
app.use("/region",regionRoutes);
app.use("/employees",employeesRoutes);
*/


// 404 HANDLER 
app.use(function(request,response,next){
	const err = new ExpressError("Not Found",404);

	//pass err to the next middleware 
	return next(err)
});


// GENERAL ERROR HANDLER 

app.use(function(error, request, response, next){
	// the default status is 500 Internal Server error 
	let status = error.status || 500; 


  // set the status and alert the user 
return response.status(status).json({
		error:{
			message: error.message,
			status: status
		}
	})


})