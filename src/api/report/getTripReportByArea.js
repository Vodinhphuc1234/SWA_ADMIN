const { BaseAPI } = require("..");

const getTripReportByArea = async (params, serverSidePrams) => {
  const instance = BaseAPI(serverSidePrams);

 
  var data;
  try {
    const ret = await instance.get("/admin/reports/trips", {
      ...params,
      date_start: parseInt(params.date_start),
      date_end: parseInt(params.date_end),
    });

    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  return data;
};

export default getTripReportByArea;
