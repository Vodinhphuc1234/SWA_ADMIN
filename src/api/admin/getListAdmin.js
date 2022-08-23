import { BaseAPI } from "..";

const getListAdmin = async (params, serverSidePrams) => {
  const instance = BaseAPI(serverSidePrams);
  var data;

  try {
    const ret = await instance.get("/admin/admins/", {
      ...params,
    });
    data = ret.data;
  } catch (e) {
    if (e.response) {
      data = e.response;
    } else {
      data = null;
    }
  }

  return data;
};

export default getListAdmin;
