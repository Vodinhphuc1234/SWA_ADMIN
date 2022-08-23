const { BaseAPI } = require(".");

const deleteUser = async (url) => {
  const instance = BaseAPI();

  var data;
  try {
    const ret = await instance.delete(url);

    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default deleteUser;
