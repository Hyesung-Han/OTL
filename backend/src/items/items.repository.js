/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class ItemsRepository {

	async getItems() {
		const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		on_sale_yn = TRUE
			ORDER BY    created_at DESC
		`;
		console.debug(sql);

		return await connection.query(sql)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsByOwnerAddress(address) {
		return null;
	}

	async getRecentRegisteredItem() {
		return null;
	}

	async getRecentItemsOnSale() {
		return null;
	}

	async getItemByTokenId(tokenId) {
		return null;
	}

	async updateItemOwnerAddress(tokenId, ownerAddress) {
		return null;
	}

	async updateItemTokenIdAndOwnerAddress(item_id, token_id, owner_address) {
		const sql = `
			update items_t
			set token_id=?, owner_address=?
			where item_id=?;
		`;
		console.debug(sql);

		return await connection.query(sql, [token_id, owner_address, item_id])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async validateItemDuplicated(hashCode) {
		return null;
	}

	async insertItem(item) {
		const sql = `
			INSERT INTO items_t(owner_address, author_name, item_title, item_description, category_code)
			VALUES(?, ?, ?, ?, ?);
		`;
		console.debug(sql);

		return await connection.query(sql, [item.ownerAddress, item.author_name, item.item_title, item.item_description, item.category_code])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}
}

module.exports = ItemsRepository;