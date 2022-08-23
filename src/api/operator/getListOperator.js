import { BaseAPI } from "..";

const getListOperator = async (params, serverSidePrams) => {
  const instance = BaseAPI(serverSidePrams);
  var data;

  try {
    const ret = await instance.get("/admin/operators/", {
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

  console.log(data);

  return data;
};

export default getListOperator;
