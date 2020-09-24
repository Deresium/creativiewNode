import express from "express";
import {OAuth2Client} from "google-auth-library";
import User from "../db/models/eshop/User";
import Roles from "../enums/roles";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {getPayloadCookie, getSignatureCookie} from "../cookies";

const userRouter = express.Router();

userRouter.post('/login', async(req, res) => {
	let userLoginSuccess: User | null = null;
	
	const email = req.body.email;
	const password = req.body.password;
	
	const idToken = req.body.idToken;
	const name = req.body.name;
	
	try {
		if (email && idToken && name) {
			const client = new OAuth2Client(process.env.CLIENT_ID);
			
			const ticket = await client.verifyIdToken({
				idToken: req.body.idToken,
				audience: process.env.CLIENT_ID
			});
			
			const payload = ticket.getPayload();
			if (payload) {
				const userid = payload['sub'];
				
				let user = await User.findOne({where: {googleId: userid}});
				if (!user) {
					user = await User.create({
						fullName: name,
						email,
						googleId: userid,
						roleCode: Roles.USER
					});
				}
				userLoginSuccess = user;
			} else {
				res.status(401).send();
			}
		} else if (email && password) {
			const foundUser = await User.findOne({where: {email}});
			if(!foundUser)
				res.status(400).send('Email ou mot de passe incorrect');
			
			const passwordHash = await bcrypt.hash(password, foundUser.userSalted);
			const compare = passwordHash === foundUser.userPassword;
			if(compare){
				userLoginSuccess = foundUser;
			}else{
				res.status(400).send('Email ou mot de passe incorrect');
			}
			
		} else {
			res.status(401).send();
		}
		
		if(userLoginSuccess){
			const token = jwt.sign({id: userLoginSuccess.userId, role: userLoginSuccess.userRole}, process.env.JWT_SECRET).split('.');
			const signatureCookieValue = token[2];
			const payloadCookieValue = `${token[0]}.${token[1]}`;
			res.setHeader('Set-Cookie', [getSignatureCookie(signatureCookieValue), getPayloadCookie(payloadCookieValue)]);
			res.status(200).send(userLoginSuccess.userRole);
		}
		
	}catch(error){
		res.send(500).send();
	}
});

userRouter.post('/createAccount', async(req, res) => {
	const name = req.body.name;
	const firstName = req.body.firstName;
	const email = req.body.email;
	const password = req.body.password;
	const repeatPassword = req.body.repeatPassword;
	
	if(password !== repeatPassword)
		res.status(400).send();
	
	try{
		const foundUser = await User.findOne({where: {email}});
		if(foundUser){
			res.status(400).send('Un utilisateur associé à cet email existe déjà');
		}else {
			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(password, salt);
			const user = await User.create({
				fullName: `${firstName} ${name}`,
				email,
				password: passwordHash,
				salted: salt,
				roleCode: Roles.USER
			});
			res.status(200).send({
				id: user.userId
			})
		}
	}catch(error){
		res.status(400).send();
	}
})

userRouter.post('/logout', async(req, res) => {
	res.setHeader('Set-Cookie', [getSignatureCookie('', true), getPayloadCookie('', true)]);
	res.send();
})

export default userRouter;