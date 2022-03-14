/**
 * /user APIs
 */
const express = require("express");
const router = express.Router();
const UserService = require("./user.service");
const { upload } = require("../../config/s3-config");
const userService = new UserService();

/**
 * LJA | 2022.03.14 | v1.0
 * @name login
 * @api {post} /user/login?user_address=
 * @des 사용자 주소가 존재하는지 확인 후 없는 경우 DB에 저장
 */
router.post("/login", async function (req, res) {
	// request값이 존재하는지 확인
	if(!req.body || !req.body.user_address) {
		res.status(403).send({result:"fail", msg:"잘못된 파라미터입니다."});
		return;
	}
	const user_address = req.body.user_address;
	
	// 현재 address가 이미 가입되어 있는지 확인
	const user = await (await userService.getUser(user_address));
	// 가입되어 있는 경우
	if(user.responseBody.data != null) {
		res.status(user.statusCode).send(user.responseBody);
		return;
	}
	
	const { statusCode, responseBody } = await userService.insertUser(user_address);

	res.statusCode = statusCode;
	res.send(responseBody);
});

module.exports = router;
