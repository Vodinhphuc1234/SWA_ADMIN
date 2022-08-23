import { BaseAPI } from "..";

const addDriver = async (user) => {
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.post("/admin/drivers/", { ...user });
    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default addDriver;
