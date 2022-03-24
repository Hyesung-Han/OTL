/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class HomeRepository {

	//owner_address를 이용하여 현재 마이룸 꾸미기에 사용중인 아이템의 정보 불러오기 
	async getHomeByOwnerAddress(owner_address) {
		let sql = `
			SELECT 		token_id,
						category_code,
						x_index,
						y_index,
						z_index
			FROM    	items_t
			WHERE		on_use_yn = 1 		
			AND			owner_address = ?
			ORDER BY 	token_id DESC
		`;

		console.debug(sql);

		return await connection.query(sql, owner_address)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	//마이룸 꾸미기 수정
	async updateHomeitem(token_id, on_use_yn, x_index, y_index, z_index) {
		const sql = `
			UPDATE items_t
			SET on_use_yn = ?, x_index = ?, y_index = ?, z_index = ? 
			WHERE token_id = ?
		`;
		console.debug(sql);

		return await connection.query(sql, [token_id, on_use_yn, x_index, y_index, z_index])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}
}

module.exports = HomeRepository;