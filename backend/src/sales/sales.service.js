/**
 * Services Logics related to Sale
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const SalesRepository = require('./sales.repository');
const salesRepository = new SalesRepository();

const ItemsRepository = require('../items/items.repository');
const itemsRepository = new ItemsRepository();

const connection = require('../../config/connection').promise();

class SalesService {

	async createSales(data) {
		try {
			await connection.beginTransaction();
			await salesRepository.createSales(data);
			await salesRepository.createSalesItems(data.token_id);

			await connection.commit();
			return {
				statusCode: 201,
				responseBody: {
					result: 'success'
				}
			};
		} catch(e) {
			await connection.rollback();
			throw e;
		}
	}

	async getSales(token_id) {
		const data = await salesRepository.getSalesByTokenId(token_id);
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: data[0]
			}
		};
	}

	async getSalesHistory(token_id) {
		const data = await salesRepository.getSalesHistory(token_id);
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: data
			}
		};
	}	

	async completeSales(token_id, buyer_address) {
		try {
			await connection.beginTransaction();

			await salesRepository.completeSales(token_id, buyer_address);
			await itemsRepository.updateItemOwnerAddress(token_id, buyer_address);

			await connection.commit();
			return {
				statusCode: 201,
				responseBody: {
					result: 'success'
				}
			};
		} catch(e) {
			await connection.rollback();
			throw e;
		}
	}

	async deleteSales(sale_id) {
		try {
			await connection.beginTransaction();

			await salesRepository.deleteSalesUpdate(sale_id);
			const data = await salesRepository.deleteSales(sale_id);
			console.log(data);

			await connection.commit();
			return {
				statusCode: 201,
				responseBody: {
					result: 'success'
				}
			};
		} catch(e) {
			await connection.rollback();
			throw e;
		}
	}

}

module.exports = SalesService;