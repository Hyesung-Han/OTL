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

  async checkNick(user_nickname) {
    const chk = await userRepository.checkNick(user_nickname);
    const usable = (chk == 0 ? true:false);
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: usable,
      }
    }
  }

  async insertProfile(user) {
    const result = await userRepository.insertProfile(user);
    return {
      statusCode: 201,
      responseBody: {
        result: "success",
      },
    };
  }

  async updateProfile(user) {
    const result = await userRepository.updateProfile(user);
    return {
      statusCode: 201,
      responseBody: {
        result: "success",
      },
    };
  }

  async updateProfileImage(user_address, user_image_url) {
    const result = await userRepository.updateProfileImage(user_address, user_image_url);
    return {
      statusCode: 201,
      responseBody: {
        result: "success",
      },
    };
  }

  async getUserList(user_nickname) {
    const user = await userRepository.getUserList(user_nickname);
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
		      data: user,
        },
      };
  }

  async deleteProfileImage(currentImage) {
      try {
        const filename = currentImage.split('/').pop();
        deleteS3Object('profile/'+filename);
      } catch(e) {
        console.error("delete profile image",e);
      }
  }
}

module.exports = UserService;
