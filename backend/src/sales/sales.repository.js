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

	async getSalesByTokenId(tokenId) {
		return null;
	}

	async getSales() {
		return null;
	}

	async deleteSales(saleId) {
		return null;
	}

	async completeSales(tokenId, data) {
		return null;
	}
}

module.exports = SalesRepository;




