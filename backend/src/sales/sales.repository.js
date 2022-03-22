/**
 * sales table Manipulations
 * sales 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class SalesRepository {

	async createSales(data) {
		const sql = `
			INSERT INTO sales_t(sale_contract_address, token_id, seller_address, completed_at)
			VALUES(?, ?, ?, ?);
		`;
		console.debug(sql);

		return await connection.query(sql, [data.sale_contract_address, data.token_id, data.saller_address, data.completed_at])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getSalesByTokenId(token_id) {
		const sql = `
			SELECT sale_id, sale_contract_address, sale_yn, token_id, seller_address, buyer_address, created_at, completed_at
			FROM sales_t
			WHERE token_id = ?
		`;
		console.debug(sql);

		return await connection.query(sql, token_id)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async deleteSales(saleId) {
		return null;
	}

	async completeSales(tokenId, data) {
		return null;
	}
}

module.exports = SalesRepository;




