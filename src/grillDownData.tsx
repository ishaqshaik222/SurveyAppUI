/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "./custom-hooks";
import { config } from './Constants';

const BASE_URL = config.url.API_URL

export const GrillDownData = () => {
  const queryParams = useQueryParams();

  const [grillDownWorkers, setGrillDownWorkersData] = useState<any[]>([]);
  const [fieldWorkerLoading, setFieldWorkerLoading] = useState(false);

  const getgrillDownWorkers = async () => {
    try {
      setFieldWorkerLoading(true);

      const res = await fetch(`${BASE_URL}/getAssemblyGrillData.php`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      });

      const json = await res.json();

      setGrillDownWorkersData(json.response.REPORT);
    } catch (error) {
      console.log({ error });
    } finally {
      setFieldWorkerLoading(false);
    }
  };

  useEffect(() => {
    getgrillDownWorkers();
  }, []);

  const navigate = useNavigate();

  const handleClick = (
    state: string,
    status: string
  ) => {
    navigate(
      `/get-reports?state=${state}&status=${status}`
    );
  };

  if (fieldWorkerLoading) {
    return <h1>Loading...</h1>;
  }

  if (grillDownWorkers.length === 0) {
    return <h1>No Data found!</h1>;
  }

  return (
    <div className="container p-5">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>State</th>
              <th>Status</th>
              <th>Survey Counts</th>
            </tr>
          </thead>

          <tbody>
            {grillDownWorkers.map((data, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleClick(
                    data.STATE_CD,
                    data.STATUS
                  )
                }
              >
                <td>{index + 1}</td>
                <td>{data.STATE_CD}</td>
                <td>{data.STATUS}</td>
                <td>{data.SURVEYS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
