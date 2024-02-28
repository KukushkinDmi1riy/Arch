import { body } from 'express-validator';

export const loginValidator = [
	body('email', 'Неверный формат').isEmail(),
	body('password', 'Too short password').isLength({min: 5})
]

export const registerValidator = [
	body('email', 'Неверный формат').isEmail(),
	body('password', 'Too short password').isLength({min: 5}),
	body('fullName', 'Name should be more then 2 symbols').isLength({min: 2}),
	body('avatarUrl', 'Irr URl').optional().isURL()
]

export const postValidator = [
	body('title', 'Enter Title').isLength({min: 3}).isString(),
	body('text', 'Too short password').isLength({min: 3}).isString(),
	body('tags', 'tags error. incorrect tags format').optional().isString(),
	body('imageUrl', 'Irr URl').optional().isString()
]