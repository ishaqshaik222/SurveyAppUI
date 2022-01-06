/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "./custom-hooks";
import { config } from './Constants';

const BASE_URL = config.url.API_URL

export const GetReports = () => {
  const queryParams = useQueryParams();

  const [reportWorkers, setReportWorkersData] = useState<any[]>([]);
  const [fieldWorkerLoading, setFieldWorkerLoading] = useState(false);

  const getreportWorkers = async () => {
    try {
      setFieldWorkerLoading(true);

      const res = await fetch(`${BASE_URL}/getReports.php`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          state: queryParams.get("state"),
          status: queryParams.get("status"),
        }),
      });

      const json = await res.json();

      setReportWorkersData(json.response.REPORT);
    } catch (error) {
      console.log({ error });
    } finally {
      setFieldWorkerLoading(false);
    }
  };

  useEffect(() => {
    getreportWorkers();
  }, []);

  const navigate = useNavigate();

  const handleClick = (
    code: string,
    status: string
  ) => {
    navigate(
      `/get-report-details?code=${code}&status=${status}`
    );
  };

  if (fieldWorkerLoading) {
    return <h1>Loading...</h1>;
  }

  if (!reportWorkers) {
    return <h1>No Data found!</h1>;
  }

  return (
    <div className="container p-5">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Assembly Code</th>
              <th>Assembly Name</th>
              <th>Completed</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reportWorkers.map((data, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleClick(
                    data.ASSEMBLY_CODE,
                    data.STATUS
                  )
                }
              >
                <td>{index + 1}</td>
                <td>{data.ASSEMBLY_CODE}</td>
                <td>{data.ASSEMBLY_NAME}</td>
                <td>{data.COMPLETED}</td>
                <td>{data.STATUS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
