const { BaseAPI } = require("..");

const getTripIncomeReport = async (params, serverSidePrams) => {
  const requestParams = {
    ...params,
    date_start: parseInt(params.date_start),
    date_end: parseInt(params.date_end),
  };

  console.log("req params: ", params);
  const instance = BaseAPI(serverSidePrams);

  var data;
  try {
    const ret = await instance.get("/admin/reports/trips/revenue/", {
      ...params,
    });

    console.log("hehgeugfgvuv", ret.data);

    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default getTripIncomeReport;
