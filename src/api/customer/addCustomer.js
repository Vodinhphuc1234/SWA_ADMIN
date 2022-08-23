import { BaseAPI } from "..";

const addCustomer = async (user) => {
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.post("/admin/riders/", { ...user });
    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default addCustomer;
