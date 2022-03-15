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
 * @api {post} /user/login
 * @des 사용자 주소가 존재하는지 확인 후 없는 경우 DB에 저장, 있는 경우 회원 정보를 리턴해준다
 */
router.post("/login", async function (req, res) {
	// request값이 존재하는지 확인
	if(!req.body || !req.body.user_address) {
		res.status(403).send({result:"fail", msg:"잘못된 파라미터입니다."});
		return;
	}
	const user_address = req.body.user_address;
	
	try {
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

	} catch(e) {
		console.error("getUser",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.15 | v1.0
 * @name checkNick
 * @api {get} /user/checkNick?user_nickname=nickname
 * @des 입력한 닉네임이 존재하는지 확인 후 사용 가능 여부(true or false)를 리턴해준다
 */
router.get("/checkNick", async function (req, res){
	const {user_nickname} = req.query;
	try {
		const { statusCode, responseBody } = await userService.checkNick(user_nickname);
	
		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("checkNick", e);
		res.status(403).send({result:"fail", error:e});
	}

});

module.exports = router;
