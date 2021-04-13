exports.requireAuth = async (req, res, next) => {
	const getValidToken = () => new Promise( (resolve, reject) => setTimeout(resolve, 1000) )
	try {
		let token = await getValidToken()
		console.log("Token", token)
		if(token === true) {
			next()
		} else {
			next("Invalid token")
		}
	} catch(error) {
		throw new Error("UNAuth")
	}
}


exports.errorHandler = (err, req, res, next) => {
	console.log("In Error middleware", err)
	res.status(400).send("Unauth")
}

exports.logger = (req, res, next) => {
	console.log("*******Req logger*******");
	console.log("At time", new Date().toString());
	console.log("Method", req.method);
	console.log("URL", req.originalUrl);
	next()
}