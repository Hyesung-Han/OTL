/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class ItemsRepository {

	async getItems(user_address, page) {
		let sql = `
			SELECT 		item_id,
						token_id,
						author_name,
						item_title,
						item_description,
						item_hash,
						owner_address,
						on_sale_yn,
						on_use_yn,
						category_code,
						created_at
			FROM    	items_t
			WHERE		owner_address = ?
			ORDER BY    created_at DESC
		`;
		if(page) {
			sql+= `LIMIT		?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, [user_address, page])
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

	async getCategory() {
		const sql = `
			SELECT category_code, category_name
			FROM category_t;
		`;
		console.debug(sql);

		return await connection.query(sql)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}
}

module.exports = ItemsRepository;