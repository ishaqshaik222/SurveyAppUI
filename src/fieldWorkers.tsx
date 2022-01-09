/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "./custom-hooks";

const BASE_URL = "http://3.109.197.149/projects/survey_app/api";

export const FieldWorkers = () => {
  const queryParams = useQueryParams();

  const [fieldWorkers, setFieldWorkersData] = useState<any[]>([]);
  const [fieldWorkerLoading, setFieldWorkerLoading] = useState(false);

  const getFieldWorkers = async () => {
    try {
      setFieldWorkerLoading(true);
      const res = await fetch(`${BASE_URL}/getFieldWorkers.php`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          manager_id: queryParams.get("managerId"),
        }),
      });

      const json = await res.json();
      if(json.response !=='SURVEY_LIST_EMPTY'){
      setFieldWorkersData(json.response.REPORT);
    }else{ }
    } catch (error) {
      console.log({ error });
    } finally {
      setFieldWorkerLoading(false);
    }
  };

  useEffect(() => {
    getFieldWorkers();
  }, []);

  const navigate = useNavigate();

  const handleClick = (
    id: string,
    name: string,
    date: string,
    state: string,
    assembly: string
  ) => {
    navigate(`/details?id=${id}&name=${name}&date=${date}&state=${state}&assembly=${assembly}&managerId=${queryParams.get("managerId")}`);
  };

  if (fieldWorkerLoading) {
    return <h1>Loading...</h1>;
  }

  if (fieldWorkers?.length === 0) {
    return <h1 >No Data found!</h1>;
  }

  return (
    <div className="container p-5">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Field Worker</th>
              <th>Surveys</th>
              <th>Mobile</th>
              <th>State</th>
              <th>Assembly</th>
            </tr>
          </thead>

          <tbody>
            {fieldWorkers.map((data, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleClick(
                    data.ID,
                    data.FIRST_NAME,
                    data.DATE,
                    data.STATE,
                    data.ASSEMBLY
                  )
                }
              >
                <td>{index + 1}</td>
                <td>{data.DATE}</td>
                <td>{data.FIRST_NAME}</td>
                <td>{data.SURVEYS}</td>
                <td>{data.MOBILE}</td>
                <td>{data.STATE}</td>
                <td>{data.ASSEMBLY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
