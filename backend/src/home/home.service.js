/**
 * Services Logics related to Digital Assets(home)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const HomeRepository = require('./home.repository');
const homeRepository = new HomeRepository();

class HomeService {

	async getHomeByOwnerAddress(owner_address) {
		try {
			const data = await homeRepository.getHomeByOwnerAddress(owner_address);
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

	async updateHomeitem(token_id, on_use_yn, x_index, y_index, z_index) {
		try {
			const data = await homeRepository.updateHomeitem(token_id, on_use_yn, x_index, y_index, z_index);
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
}

module.exports = HomeService;