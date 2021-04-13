const express = require('express')
const { requireAuth, errorHandler, logger } = require('./middlewares')

const app = express()


/** 
Create Separate routes for auth and public

*/
const AuthRoutes = express.Router();
const PublicRoutes = express.Router();


/** 
You can chain routes together by using Router().route()
*/
PublicRoutes
	.route('/users/:userId')
	.get((req, res, next) => {
		console.log("Got user", req.params.userId)
		next()
	})
	.put((req, res, next) => {
		console.log("Put user", req.params.userId)
		next()
	})
	.post((req, res, next) => {
		console.log("Post user", req.params.userId)
		next()
	})
	.delete((req, res, next) => {
		console.log("Delete user", req.params.userId)
		next()
	})
	.all((req, res, next) => {
		res.status(200).send(`Req - ${req.method}`)
	})


/** 
Use middleware functions to intercept requests
Order of middlewares is important.
*/
AuthRoutes.use(requireAuth)

AuthRoutes.use(errorHandler)

AuthRoutes
	.route('/clients/:clientId')
	.get((req, res, next) => {
		console.log("Got client", req.params.clientId)
		next()
	})
	.put((req, res, next) => {
		console.log("Put client", req.params.clientId)
		next()
	})
	.post((req, res, next) => {
		console.log("Post client", req.params.clientId)
		next()
	})
	.delete((req, res, next) => {
		console.log("Delete client", req.params.clientId)
		next()
	})
	.all((req, res, next) => {
		res.status(200).send(`Req - ${req.method}`)
	})


/** 
Use middlewares suitable for root router. Add all subroutes to the root router instance
*/
app.use(logger)
app.use('/public', PublicRoutes)
app.use('/api', AuthRoutes)

app.get('/', (req, res, next) => {
	console.log("Hit root")
	res.send("root")
})

app.listen('8080', () => {
	console.log("Listening on port", '8080')
})