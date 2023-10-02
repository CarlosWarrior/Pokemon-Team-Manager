module.exports = (req, res, next) => {
	console.log(req.method + '@' + req.get('host') + req.originalUrl, req.ip, req.ips)
	next()
}