import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {registerValidator, loginValidator, postValidator} from './validations.js';

import { UserControllers, PostControllers} from './controllers/index.js';

import { handleValidationErrors, checkAuth } from './utils/index.js'


mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.t4ybjmh.mongodb.net/blog?retryWrites=true&w=majority')
	.then(()=> console.log('DB OK'))
	.catch((err)=> console.log('DB error', err.message))

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
});

const upload = multer({storage})

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/auth/me', checkAuth, UserControllers.getMe);
app.post('/auth/login', loginValidator, handleValidationErrors, UserControllers.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserControllers.register);

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	}) 
} )

app.get('/tags', PostControllers.getLastTags);

app.get('/posts/:id', PostControllers.getOne);
app.get('/posts', PostControllers.getAll);
// app.get('/posts/tags', PostControllers.getLastTags);
app.post('/posts', checkAuth, postValidator, handleValidationErrors, PostControllers.create);
app.delete('/posts/:id', checkAuth, PostControllers.remove);
app.patch('/posts/:id', checkAuth, postValidator, handleValidationErrors, PostControllers.update);

app.listen(4444, (err)=> {
	if (err) {
		return console.log(err.message)
	}

	console.log('Server Ok')
});

jmWmZP6OfPwVpl8m;