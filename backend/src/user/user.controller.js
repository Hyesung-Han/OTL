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

/**
 * LJA | 2022.03.16 | v1.0
 * @name profile
 * @api {get} /user/profile?user_address=address
 * @des 해당 주소의 프로필 정보를 반환해준다
 */
router.get("/profile", async function (req, res){
	const {user_address} = req.query;
	try {
		const { statusCode, responseBody } = await userService.getUser(user_address);
	
		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("getUser", e);
		res.status(403).send({result:"fail", error:e});
	}

});

/**
 * OYT | 2022.03.16 | v1.0.1
 * @name profile
 * @api {post} /user/profile
 * @des
 * 프로필 생성 시 필요한 데이터를 입력받아 DB에 저장.
 * 이미지의 경우 필드이름이 profile인 파일을 s3 서버에 저장 후 리턴된 url을 DB에 저장한다.
 * 이미지를 설정하지 않는 경우 기본 이미지 적용을 위해 imageUrl null 저장.
 */
router.post("/profile", upload.single('profile'), async function (req, res) {
	if(!req.body) {
		res.status(403).send({result:"fail", msg:"잘못된 파라미터입니다."});
		return;
	}
	let imageUrl;

	if(req.file){
		imageUrl = `${process.env.AWS_S3_PATH}/${req.file.key}`;
	}
	const user = {
		user_address: req.body.user_address,
		user_nickname: req.body.user_nickname,
		user_email: req.body.user_email,
		user_link: req.body.user_link,
		user_bio: req.body.user_bio,
		user_image_url: imageUrl,
	};
	
	try {
		const {statusCode, responseBody} = await userService.insertProfile(user);

		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("insertProfile",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.16 | v1.0
 * @name profile
 * @api {patch} /user/profile
 * @des 프로필 수정에 필요한 데이터(이미지 제외)를 입력받아 수정한다.
 */
router.patch("/profile", async function (req, res) {
	if(!req.body) {
		res.status(403).send({result:"fail", msg:"잘못된 파라미터입니다."});
		return;
	}

	const user = {
		user_address: req.body.user_address,
		user_nickname: req.body.user_nickname,
		user_email: req.body.user_email,
		user_link: req.body.user_link,
		user_bio: req.body.user_bio,
	};
	
	try {
		const {statusCode, responseBody} = await userService.updateProfile(user);

		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("updateProfile",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.16 | v1.0
 * @name profile
 * @api {patch} /user/profileImg
 * @des
 * 프로필 이미지를 수정한다
 * 기존 이미지가 없는 경우 바로 DB에 저장하고, 기존 이미지가 있는 경우 s3에서 이미지를 지운 후 DB에 저장한다.
 */
router.patch("/profileImg", upload.single('profile'), async function (req, res) {
	if(!req.body) {
		res.status(403).send({result:"fail", msg:"잘못된 파라미터입니다."});
		return;
	}

	// 기존 이미지가 존재하는 경우 기존 이미지 삭제(undefined가 아니고 비어있지 않음)
	const currentImage = req.body.user_image_url;
	if(!!currentImage && currentImage != '' && currentImage != null) {
		await userService.deleteProfileImage(currentImage);
	}

	const user_address = req.body.user_address;
	const user_image_url = `${process.env.AWS_S3_PATH}/${req.file.key}`;	
	try {
		const {statusCode, responseBody} = await userService.updateProfileImage(user_address, user_image_url);
		if (statusCode === 201) {
			responseBody['user_image_url'] = user_image_url;
		}
		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("updateProfileImage",e);
		res.status(403).send({result:"fail", error:e});
	}
});

/**
 * LJA | 2022.03.16 | v1.0
 * @name list
 * @api {get} /user/list?user_nickname=nickname
 * @des 검색하려는 닉네임이 포함된 모든 유저들을 반환해준다
 */
 router.get("/list", async function (req, res){
	const {user_nickname} = req.query;
	try {
		const { statusCode, responseBody } = await userService.getUserList(user_nickname);
	
		res.statusCode = statusCode;
		res.send(responseBody);

	} catch(e) {
		console.error("getUser", e);
		res.status(403).send({result:"fail", error:e});
	}

});
module.exports = router;
