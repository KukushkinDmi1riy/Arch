import PostModel from '../model/Post.js';

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId
		});

		const post = await doc.save();

		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed cteation post process'
		});
	}
}

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec()
		res.json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Posts do not loaded'
		});
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id
		
		PostModel.findByIdAndUpdate({
			_id: postId
		}, 
		{
			$inc: { viewsCount: 1 }
		}, 
		{
			returnDocument: 'after'
		}, (err, doc) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: 'Post does not loaded'
				});
			} 
			if (!doc) {
				return res.status(404).json({
					message: 'Post does not found'
				})
			}
			res.json(doc);
		})
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Posts do not loaded'
		});
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;
		PostModel.findOneAndDelete({
			_id: postId
		}, (err, doc) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					message: 'failed delete post'
				})
			}
			if(!doc) {
				return res.status(404).json({
					message: 'post doesnt found'
				})
			}
		}); 
		res.json({
			success: true
		})
	} catch (error) {
		console.log(err);
		res.status(500).json({
			message: 'Remove post is unavailable'
		});
	}
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id;

		await PostModel.updateOne({
			_id: postId
		},{
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId
		})
		res.json({
			success: true
		})
	} catch (error) {
		console.log(err);
		res.status(500).json({
			message: 'Update post is unavailable'
		});
	}
}

export const getLastTags = async (req, res) => {
	try {
		const posts = await PostModel.find().limit(5).exec()
		const tags = posts.map(obj=>obj.tags).flat().slice(0,5)
		res.json(tags);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Tags do not loaded'
		});
	}
}

