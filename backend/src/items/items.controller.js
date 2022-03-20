/**
 * /items APIs
 */
const express = require('express');
const router = express.Router();
const ItemsService = require('./items.service');
const { upload } = require("../../config/s3-config");
const itemService = new ItemsService();

/**
 * LJA | 2022.03.20 | v1.0
 * @name items
 * @api {post} /items
 * @des
 * 작품을 등록한다
 * 작품 이미지가 중복된 경우 이미지업로드X, DB에 등록X
 * 작품 이미지가 중복되지 않은 경우 이미지 업로드 및 작품 정보 DB에 저장
 */
router.post('/', upload.single('items'), async function (req, res) {
	try {
		if(await itemService.checkImage(req.file)) {
			res.status(200).send({result:"fail", msg:"이미 등록되어 있는 작품입니다."});
			return;
		}
	} catch(e) {
		console.error("checkImage",e);
		res.status(403).send({result:"fail", error:e});
	}
	const item = {
		owner_address: req.body.owner_address,
		author_name: req.body.author_name,
		item_title: req.body.item_title,
		item_description: req.body.item_description,
		category_code: req.body.category_code,
	};

	try{
		const { statusCode, responseBody } = await itemService.insertItem(item);

		if (statusCode === 201) {
			responseBody.data['item_image'] = `${process.env.AWS_CDN_PATH}/${req.file.key}`;
		}
		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("insertItem",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * PJT Ⅱ - 과제 1: Req.1-B2 작품 정보 업데이트
 */
router.patch('/:itemId', async function (req, res) {
	const itemId = req.params['itemId']
	const data = req.body
	
	const { statusCode, responseBody } = await itemService.updateItemTokenIdAndOwnerAddress(itemId, data['token_id'], data['owner_address']);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅱ 과제 2: 
 * Req.2-B1 작품 목록 조회 
 * Req.2-B2 주소가 보유한 작품 목록 조회
 *
 * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
 * Req.4-B1 작품 목록 조회
 * Req.4-B2 주소가 보유한 작품 목록 조회
 */
router.get('/', async function (req, res) {
	const { statusCode, responseBody } = await itemService.getItems(req.query['address']);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/*
 * PJT Ⅲ 과제 3: 
 * Req.4-B3 최근 등록 작품 조회
 */
router.get('/recent', async function (req, res) {
	const { statusCode, responseBody } = await itemService.getRecentItems(res);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅱ 과제 2: 
 * Req.2-B3 작품 상세 조회 
 */
router.get('/:tokenId', async function (req, res) {
	const { statusCode, responseBody } = await itemService.getItemByTokenId(req.params['tokenId'])

	res.statusCode = statusCode;
	res.send(responseBody);
});

module.exports = router;