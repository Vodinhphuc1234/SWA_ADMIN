import { BaseAPI } from "..";

export const assignCoordinator = async (url) => {
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.put(`${url}promote/coordinator/`);
    data = ret;
  } catch (e) {
    data = e.response;
  }
  console.log(data);

  return data;
};

export const assignCustomerCare = async (url) => {
  console.log(url);
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.put(`${url}promote/customer-care/`);
    data = ret;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export const assignReception = async (url) => {
  const instance = BaseAPI();

  var data;

  try {
    const ret = await instance.put(`${url}promote/reception/`);
    data = ret;
  } catch (e) {
    data = e.response;
  }

  return data;
};
