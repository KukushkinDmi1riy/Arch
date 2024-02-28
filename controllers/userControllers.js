import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../model/User.js';

export const register = async (req, res) => {
	try {
		
	const password = req.body.password;
	const salt = await bcrypt.genSalt(10);
	const pHash = await bcrypt.hash(password, salt);

	const doc = new UserModel({
		email: req.body.email,
		fullName: req.body.fullName,
		avatarUrl: req.body.avatarUrl,
		passwordHash: pHash,
	});

	const user = await doc.save();

	const token = jwt.sign({
		_id: user._id
	},
	'secret123',
	 {
		expiresIn: '30d'
	 }
	);

	const { passwordHash, ...userData } = user._doc

	res.send({
		...userData,
		token 
	});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed register process'
		});
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({email: req.body.email})

		console.log(user)

	if (!user) {
		return res.status(404).json({
			message: 'Пользователь не найден'
		});
	};

	const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

	if (!isValidPass) {
		return res.status(401).json({
			message: 'Не верный логин или пароль'
		});
	};
	const token = jwt.sign({
		_id: user._id
	},
	'secret123',
	 {
		expiresIn: '30d'
	 }
	);
	const { passwordHash, ...userData } = user._doc;

	res.send({
		...userData,
		token 
	});

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed authorization process'
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({
				message: 'Find no user'
			});
		};

		const { passwordHash, ...userData } = user._doc

		res.send(userData);
	} 
	catch(err) {
		console.log(err)
		return res.status(400).json({
			message: 'нет доступа'
		});
	}
}