import {PDFDocument} from "pdf-lib";
import * as fs from "fs";
import Basket from "./db/models/eshop/Basket";
import {getProduct} from "./db/controllers/ProductController";
import {getPriceOnCategoryIdAndProductId} from "./db/controllers/PriceController";
import Category from "./db/models/eshop/Category";
import {getTotalBasket} from "./db/controllers/BasketController";
import aws from "aws-sdk";
import {sendToAWS} from "./awsCalls";

const generateBilling = async(basket: Basket, totals: {total: number, totals: Map<number, [number, number]>}) => {
	const path = `pdf/${basket.basketId}.pdf`;
	const pdf = await PDFDocument.create();
	
	const logoPng = await pdf.embedPng(fs.readFileSync('./public/images/logo.png'));
	const pngDims = logoPng.scale(0.25);
	
	let page = pdf.addPage();
	const {width, height} = page.getSize();
	
	page.drawText(`Facture Eshop Creatiview N°${basket.basketId}`,{
		size: 20,
		x: 50,
		y: height - 50
	});
	
	const dayDate = new Date();
	page.drawText(`date: ${dayDate.getDate()}/${dayDate.getMonth() + 1}/${dayDate.getFullYear()}`,{
		size: 13,
		x: 50,
		y: height - 70
	})
	
	page.drawImage(logoPng, {
		x: width - 1.5*pngDims.width,
		y: height - 1.5*pngDims.height,
		width: pngDims.width,
		height: pngDims.height
	})
	
	let y = height - 150;
	for(const productBasket of basket.basketProductsBasket){
		console.log('QUANTITY', productBasket.productBasketQuantity);
		if(y < 120){
			page = pdf.addPage();
			y = height - 50
		}
		const product = await getProduct(productBasket.pbProductId);
		const price = await getPriceOnCategoryIdAndProductId(productBasket.pbCategoryId, productBasket.pbProductId);
		const category = await Category.findByPk(productBasket.pbCategoryId);
		page.drawText(`${product.productName} (${category.categoryName})`, {
			size: 13,
			x: 50,
			y
		})
		y -= 20;
		
		page.drawText(`Prix unitaire: ${(price.pricePrice * (1 + product.productVat/100)).toFixed(2)}€`,{
			size: 13,
			x: 50,
			y
		})
		y-= 20;
		
		page.drawText(`Quantité: ${productBasket.productBasketQuantity}`,{
			size: 13,
			x: 50,
			y
		})
		
		y -= 50;
	}
	
	
	totals.totals.forEach((value, key) => {
		if(y < 100){
			page = pdf.addPage();
			y = height - 50
		}
		
		page.drawText(`TVA ${key.toString()}%`,{
			size: 13,
			x: 50,
			y
		})
		
		page.drawText(`HTVA: ${value[0].toFixed(2)}€`,{
			size: 13,
			x: 250,
			y
		})
		
		page.drawText(`TVAC: ${value[1].toFixed(2)}€`,{
			size: 13,
			x: 450,
			y
		})
		
		y -= 20;
	})
	
	if(y < 50){
		page = pdf.addPage();
		y = height - 50;
	}

	page.drawText(`TOTAL: ${totals.total.toFixed(2)}€`,{
		size: 17,
		x: 50,
		y
	})
	
	
	const pdfBytes = await pdf.save();
	const buffer: Buffer = new Buffer(pdfBytes);
	await sendToAWS(buffer, basket.basketId);
	return pdfBytes;
}

export default generateBilling;