const { BaseAPI } = require("..");

const getAdmin = async (url, serverSidePrams) => {
  const instance = BaseAPI(serverSidePrams);

  var data;
  try {
    const ret = await instance.get(url);
    data = ret.data;
  } catch (e) {
    if (e.response) {
      data = e.response;
    }
  }

  return data;
};

export default getAdmin;
