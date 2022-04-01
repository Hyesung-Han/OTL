/**
 * /sales APIs
 */
const express = require('express');
const router = express.Router();
const SalesService = require('./sales.service');
const salesService = new SalesService();

/**
 * LJA | 2022.03.30 | v2.0
 * @name sales
 * @api {post} /sales
 * @des 아이템 판매 등록
 * sales_t에 data insert 및 items_t on_sale_yn 1로 업데이트
 */
router.post('/', async function (req, res) {
	try {
		const { statusCode, responseBody } = await salesService.createSales(req.body);

		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("createSales",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.22 | v1.0
 * @name sales
 * @api {get} /sales
 * @des 판매 정보 상세보기
 */
router.get('/', async function (req, res) {
	try {
		const { statusCode, responseBody } = await salesService.getSales(req.query['token_id']);
	
		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getSales",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * OYT | 2022.03.31 | v1.1
 * @name sales
 * @api {get} /sales/history
 * @des 판매 히스토리 상세보기
 */
 router.get('/history', async function (req, res) {
	try {
		const { statusCode, responseBody } = await salesService.getSalesHistory(req.query['token_id']);
	
		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getSales",e);
		res.status(403).send({result:"fail", error:e});
	}
});


/**
 * LJA | 2022.03.22 | v1.0
 * @name sales
 * @api {patch} /sales/:token_id/complete
 * @des 판매 완료 처리(items, sales 테이블)
 */
 router.patch('/:token_id/complete', async function (req, res) {
	const token_id = req.params['token_id'];
	const buyer_address = req.body.buyer_address;
	try {
		const { statusCode, responseBody } = await salesService.completeSales(token_id, buyer_address)
	
		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("completeSales",e);
		res.status(403).send({result:"fail", error:e});
	}
});

 router.delete('/:sale_id', async function (req, res) {
	 try {
		const { statusCode, responseBody } = await salesService.deleteSales(req.params['sale_id']);
	
		res.statusCode = statusCode;
		res.send(responseBody);
	 } catch(e) {
		console.error("deleteSales",e);
		res.status(403).send({result:"fail", error:e});
	}
});

module.exports = router;
