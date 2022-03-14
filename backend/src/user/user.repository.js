/**
 * user table Manipulations
 * user 테이블에 접근합니다.
 */
const connection = require("../../config/connection").promise();

class UserRepository {

	async insertUser(user_address) {
		const sql = `
			INSERT INTO user_t(user_address)
			VALUES(?);
		`;
		console.debug(sql);

		return await connection.query(sql, user_address)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getUser(user_address) {
		const sql = `
			SELECT user_address, user_nickname, user_email, user_bio, user_image_url, created_at
			FROM user_t
			WHERE user_address=?;
		`;
		console.debug(sql);

		return await connection.query(sql, [user_address])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}
}

module.exports = UserRepository;
