/**
 * /sales APIs
 */
const express = require('express');
const router = express.Router();
const SalesService = require('./sales.service');
const salesService = new SalesService();

/**
 * LJA | 2022.03.22 | v1.0
 * @name sales
 * @api {post} /sales
 * @des 아이템 판매 등록
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
 * PJT Ⅲ 과제 3: 
 * Req.3-B1 구매자 정보 업데이트
 */
 router.patch('/:tokenId/complete', async function (req, res) {
	const tokenId = req.params['tokenId'];
	const data = req.body;

	const { statusCode, responseBody } = await salesService.completeSales(tokenId, data)

	res.statusCode = statusCode;
	res.send(responseBody);
});
/**
 * PJT Ⅲ 과제 3: 
 * Req.3-B2 판매 취소
 */
 router.delete('/:saleId', async function (req, res) {
	const { statusCode, responseBody } = await salesService.deleteSales(req.params['saleId']);

	res.statusCode = statusCode;
	res.send(responseBody);
});

module.exports = router;
