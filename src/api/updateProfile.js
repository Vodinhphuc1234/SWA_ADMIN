const { BaseAPI } = require(".");

const updateProfile = async (user) => {
  const instance = BaseAPI();
  console.log(user);

  var data;
  try {
    const ret = await instance.patch(user.self, {
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
    });

    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default updateProfile;
