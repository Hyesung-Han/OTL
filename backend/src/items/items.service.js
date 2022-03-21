/**
 * Services Logics related to Digital Assets(item)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const ItemsRepository = require('./items.repository');
const {getS3List, deleteS3Object} = require("../../config/s3-config");
const itemRepository = new ItemsRepository();

class ItemsService {

	async checkImage(file) {
		let result;
		try {
			await getS3List().then(data => {
				result = data.filter(items => items.ETag === file.etag);
			});
			if(result.length > 1) {
				await deleteS3Object(file.key);
				return true;
			}
		} catch(e) {
			throw e;
		}
	}

	async insertItem(item) {
		try {
			const data = await itemRepository.insertItem(item);
			if(data.length != 0) {
				return {
					statusCode: 201,
					responseBody: {
						result: 'success',
						data: {item_id:data.insertId},
					}
				}
			} else {
				return {
					statusCode: 403,
					responseBody: {
						result: 'fail',
						error: error,
					}
				}
			}
		} catch(e) {
			throw e;
		}
	}

	async updateItemTokenIdAndOwnerAddress(item_id, token_id, owner_address) {
		try {
			const data = await itemRepository.updateItemTokenIdAndOwnerAddress(item_id, token_id, owner_address);
			return {
				statusCode: 201,
				responseBody: {
					result: 'success',
				}
			}
		} catch(e) {
			throw e;
		}
	}

	async getItems(user_address, page) {
		try {
			const data = await itemRepository.getItems(user_address, (page-1)*100);
			return {
				statusCode: 200,
				responseBody: {
					result: 'success',
					data: data,
				}
			};
		} catch(e) {
			throw e;
		}
	}

	async getItemByTokenId(tokenId) {
		try {
			const data = await itemRepository.getItemByTokenId(tokenId);
			return {
				statusCode: 200,
				responseBody: {
					result: 'success',
					data: data[0],
				}
			};
		} catch(e) {
			throw e;
		}
	}

	/*
	 * PJT Ⅲ 과제 3: 
	 * Req.4-B3 최근 등록 작품 조회
	 */
	async getRecentItems() {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		}
	}

	async updateItemOwnerAddress(tokenId, ownerAddress) {
		if (await itemRepository.updateItemOwnerAddress(tokenId, ownerAddress)) {
			return {
				statusCode: 200,
				responseBody: {
					result: 'success'
				}
			};
		}
	}

	async getCategory() {
		const data = await itemRepository.getCategory();
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: data,
			}
		}
	}
}

module.exports = ItemsService;