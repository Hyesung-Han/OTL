/**
 * Services Logics related to Digital Assets(user)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const UserRepository = require("./user.repository");
const { getS3List, deleteS3Object } = require("../../config/s3-config");
const userRepository = new UserRepository();

class UserService {

  async insertUser(user_address) {
	  const result = await userRepository.insertUser(user_address);
      return {
        statusCode: 201,
        responseBody: {
          result: "success",
		  data: {'user_address':user_address},
        },
      };
  }

  async getUser(user_address) {
    const user = await userRepository.getUser(user_address);
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
		  data: user[0],
        },
      };
  }
}

module.exports = UserService;
