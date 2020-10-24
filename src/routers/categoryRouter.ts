import express from "express";
import Category from "../db/models/eshop/Category";
import {auth, authOnlyOwner} from "../middlewares/authentication";

const categoryRouter = express.Router();

categoryRouter.post('/category', auth, authOnlyOwner, async(req, res) => {
	try{
		const category = await Category.create({
			...req.body
		})
		res.send(category);
	}catch(error){
		console.log(error);
		res.status(500).send('Une erreur est survenue');
	}
});

categoryRouter.get('/category', async(req, res) => {
	try{
		const categories = await Category.findAll({order:['name']});
		res.send(categories);
	}catch(error){
		console.log(error);
		res.status(500).send('une erreur est survenue');
	}
});

categoryRouter.delete('/category/:id', auth, authOnlyOwner, async(req, res) => {
	try{
		await Category.destroy({where: {id: req.params.id}});
		res.send();
	}catch(error){
		console.log(error);
		res.status(500).send('Une erreur est survenue');
	}
});


export default categoryRouter;