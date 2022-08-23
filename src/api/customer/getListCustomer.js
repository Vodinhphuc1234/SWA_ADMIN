import { BaseAPI } from "..";

const getListCustomer = async (params, serverSidePrams) => {
  console.log(params);
  const instance = BaseAPI(serverSidePrams);
  var data;

  try {
    const ret = await instance.get("/admin/riders/", {
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

export default getListCustomer;
