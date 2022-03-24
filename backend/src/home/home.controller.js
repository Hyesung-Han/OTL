/**
 * /items APIs
 */
const express = require('express');
const router = express.Router();
const HomeService = require('./home.service');
const { upload } = require("../../config/s3-config");
const homeService = new HomeService();



/**
 * HHS | 2022.03.24 | v1.0
 * @name home
 * @api {get} /home?owner_address=address
 * @des
 * 사용자의 마이룸 꾸미기에 사용된 아이템 목록 가져오기
 */
router.get('/:owner_address', async function (req, res) {
	try {
		const { statusCode, responseBody } = await homeService.getHomeByOwnerAddress(req.params['owner_address']);

		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("getHomeByOwnerAddress",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * HHS | 2022.03.24 | v1.0
 * @name home
 * @api {patch} /home/:token_id
 * @des
 * 마이룸 꾸미기에 사용된 아이템의 정보를 업데이트 해준다.
 */
 router.patch('/:token_id', async function (req, res) {
	const token_id = req.params['token_id']
	const data = req.body;
	try{
		const { statusCode, responseBody } = await homeService.updateHomeitem(token_id, data['on_use_yn'], data['x_index'], data['y_index'], data['z_index']);
		res.statusCode = statusCode;
		res.send(responseBody);
	} catch(e) {
		console.error("updateHomeitem",e);
		res.status(403).send({result:"fail", error:e});
	}
});

module.exports = router;