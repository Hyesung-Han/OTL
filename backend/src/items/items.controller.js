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
		owner_address: req.body.user_address,
		author_name: req.body.author_name,
		item_title: req.body.item_title,
		item_description: req.body.item_description,
		category_code: req.body.category_code,
	};

	try{
		const { statusCode, responseBody } = await itemService.insertItem(item);

		if (statusCode === 201) {
			responseBody.data['item_image'] = `${process.env.AWS_S3_PATH}/${req.file.key}`;
		}
		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("insertItem",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.21 | v1.0
 * @name items
 * @api {patch} /items/:itemId
 * @des
 * NFT로 등록된 아이템의 정보를 업데이트 해준다.
 */
router.patch('/:item_id', async function (req, res) {
	const item_id = req.params['item_id']
	const data = req.body;
	try{
		const { statusCode, responseBody } = await itemService.updateItemTokenIdAndOwnerAddress(item_id, data['token_id'], data['owner_address']);
		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("updateItemTokenIdAndOwnerAddress",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.21 | v1.0
 * @name items
 * @api {get} /items/category
 * @des 모든 카테고리를 리턴해준다
 */
router.get("/category", async function (req, res) {
	try{
		const { statusCode, responseBody } = await itemService.getCategory();

		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getCategory",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.21 | v1.1
 * @name items
 * @api {get} /items?user_address=address&page=page
 * @des
 * 사용자의 전체 아이템목록 가져오기
 * page입력시 100개 단위로 출력
 */
router.get('/', async function (req, res) {
	try {
		const { statusCode, responseBody } = await itemService.getItemsByOwnerAddress(req.query['user_address'], req.query['page']);

		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getItemsByOwnerAddress",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.22 | v1.0
 * @name items
 * @api {get} /items/list?category_code=code&item_title=title&page=page
 * @des
 * 전체 작품 목록
 * 전체 작품 검색, 카테고리별 검색, 제목별 검색 가능
 */
router.get('/list', async function (req, res) {
	console.log("/list 호출");
	try {
		const { statusCode, responseBody } = await itemService.getItemList(req.query['category_code'], req.query['item_title'], req.query['page']);
	
		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getItemList",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.22 | v1.0
 * @name items
 * @api {get} /items/listCnt?category_code=code&item_title=title&page=page
 * @des
 * 전체 작품 수, 카테고리별 작품 수, 제목별 작품 수
 * 페이징 처리를 위한 작품 수 리턴
 */
router.get('/listCnt', async function (req, res) {
	console.log("/list 호출");
	try {
		const { statusCode, responseBody } = await itemService.getItemListCnt(req.query['category_code'], req.query['item_title'], req.query['page']);
	
		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getItemListCnt",e);
		res.status(403).send({result:"fail", error:e});
	}
});


/**
 * LJA | 2022.03.21 | v1.0
 * @name items
 * @api {get} /items/:token_id
 * @des 작품 상세보기
 */
router.get('/:token_id', async function (req, res) {
	try{
		const { statusCode, responseBody } = await itemService.getItemByTokenId(req.params['token_id'])

		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getItemByTokenId",e);
		res.status(403).send({result:"fail", error:e});
	}
});

module.exports = router;