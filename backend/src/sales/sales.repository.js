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

		return await connection.query(sql, [data.sale_contract_address, data.token_id, data.seller_address, data.completed_at])
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
			WHERE token_id = ? and sale_yn = '1'
		`;
		console.debug(sql);

		return await connection.query(sql, token_id)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getSalesHistory(token_id) {
		const sql = `
			SELECT sale_id, sale_contract_address, sale_yn, token_id, seller_address, buyer_address, created_at, completed_at
			FROM sales_t
			WHERE token_id = ? and sale_yn = '0'
			ORDER BY sale_id DESC
		`;
		console.debug(sql);

		return await connection.query(sql, token_id)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}	

	async deleteSales(sale_id) {
		const sql = `
			DELETE FROM sales_t
			WHERE sale_id = ?
		`;
		console.debug(sql);

		return await connection.query(sql, sale_id)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async completeSales(token_id, buyer_address) {
		const sql = `
			UPDATE sales_t
			SET sale_yn = '0', buyer_address = ?, completed_at = now()
			WHERE token_id = ?
			ORDER BY sale_id DESC
			LIMIT 1;
		`;
		console.debug(sql);

		return await connection.query(sql, [buyer_address, token_id])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async deleteSalesUpdate(sale_id) {
		const sql = `
			UPDATE items_t
			SET on_sale_yn = '0'
			WHERE token_id = (SELECT token_id FROM sales_t WHERE sale_id = ?)
		`;
		console.debug(sql);

		return await connection.query(sql, sale_id)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async createSalesItems(token_id) {
		const sql = `
			UPDATE items_t
			SET on_sale_yn = '1'
			WHERE token_id = ?
		`;
		console.debug(sql);

		return await connection.query(sql, [token_id])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}
}

module.exports = SalesRepository;




