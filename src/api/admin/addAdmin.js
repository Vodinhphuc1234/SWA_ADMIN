import { BaseAPI } from "..";

const addAdmin = async (user) => {
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.post("/admin/admins/", { ...user });
    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default addAdmin;
