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

	async checkNick(user_nickname) {
		const sql = `
			SELECT user_address
			FROM user_t
			WHERE user_nickname=?;
		`;
		console.debug(sql);

		return await connection.query(sql, [user_nickname])
			.then(data => data[0].length)
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async insertProfile(user) {
		const sql = `
			UPDATE user_t
			SET user_nickname=?, user_email=?, user_bio=?, user_link=?, user_image_url=?
			WHERE user_address=?;
		`;
		console.debug(sql);

		return await connection.query(sql, [user.user_nickname, user.user_email, user.user_bio, user.user_link, user.user_image_url, user.user_address])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async updateProfile(user) {
		const sql = `
			UPDATE user_t
			SET user_nickname=?, user_email=?, user_bio=?, user_link=?
			WHERE user_address=?;
		`;
		console.debug(sql);

		return await connection.query(sql, [user.user_nickname, user.user_email, user.user_bio, user.user_link, user.user_address])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async updateProfileImage(user_address, user_image_url) {
		const sql = `
			UPDATE user_t
			SET user_image_url=?
			WHERE user_address=?;
		`;
		console.debug(sql);

		return await connection.query(sql, [user_image_url, user_address])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getUserList(user_nickname) {
		const sql = `
			SELECT user_address, user_nickname, user_image_url
			FROM user_t
			WHERE user_nickname LIKE ?
		`;
		console.debug(sql);

		return await connection.query(sql, '%'+user_nickname+'%')
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}
}

module.exports = UserRepository;
