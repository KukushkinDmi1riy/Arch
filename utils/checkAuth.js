import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if(token) {
		try { 
			const decoced = jwt.verify(token, 'secret123')
			req.userId = decoced._id;
			next()
		} catch(err) {
			console.log(err)
			return res.status(403).json({
			message: 'NO ACCESS!! Wrong token'
		})
		}

	} else {
		return res.status(403).json({
			message: 'NO ACCESS!!'
		})
	}

};