import { BaseAPI } from "..";

const addOperator = async (user) => {
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.post("/admin/operators/", { ...user });
    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default addOperator;
