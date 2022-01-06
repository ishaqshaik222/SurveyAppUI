/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Map,
  Marker,
  IProvidedProps,
  GoogleApiWrapper,
} from "google-maps-react";
import moment from "moment";
import { useQueryParams } from "../custom-hooks";
import { Button,Table} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const BASE_URL = "http://3.109.197.149/projects/survey_app/api";

interface Props extends IProvidedProps {}

const Cluster = ({ google }: Props) => {
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const [toDate, setToDate] = useState(
    queryParams.get("date") || moment().format("YYYY-MM-DD")
  );
  const [fromDate, setFromDate] = useState(
    queryParams.get("date") || moment().format("YYYY-MM-DD")
  );
  const [surveyData, setSurveyData] = useState<any[]>([]);

  const [surveyDataLoading, setSurveyDataLoading] = useState(false);

  const [called, setCalled] = useState(false);

  const getSurveyData = async () => {
    try {
      setCalled(false);
      setSurveyDataLoading(true);

      const res = await fetch(`${BASE_URL}/getSurveyData.php`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          uid: queryParams.get("id"),
          to: toDate,
          from: fromDate,
          state: queryParams.get("state"),
          assembly: queryParams.get("assembly"),
        }),
      });
      console.log(res)
      const json = await res.json();

      if (json.status === "ERROR") {
        setSurveyData([]);
        return;
      }
      setSurveyData(json.response.REPORT);
    } catch (error) {
      console.log({ error });
    } finally {
      setCalled(true);
      setSurveyDataLoading(false);
    }
  };
  const id =  queryParams.get("id")?.toString();

  const actionOnCLick = (data:any)=>{
    const managerId =  queryParams.get("managerId")?.toString();
    navigate(`/actions?RId=${data.RECORD_ID}&managerId=${managerId}`);
  }
  useEffect(() => {
    getSurveyData();
  }, [fromDate, toDate]);

  return (
    <div className="container p-5">
      <div className="col-md-8 my-5">
        <div className="row p-2">
          <h1>
            Showing {surveyData.length} records for {queryParams.get("name")}
          </h1>
        </div>
        <div className="row p-2">
          <div className="col-md-3">
            <label htmlFor="from">From Date</label>
          </div>

          <input
            name="from"
            type="date"
            value={fromDate}
            className="col-md-3"
            placeholder="Calendar"
            onChange={(e) => setFromDate(e.target.value)}
          />

          <label className="col-md-3" htmlFor="to">
            To Date
          </label>
          <input
            name="to"
            type="date"
            value={toDate}
            className="col-md-3"
            placeholder="Calendar"
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {surveyDataLoading && <h1>Loading...</h1>}

      {called && surveyData.length === 0 && <h1>No Data found!</h1>}

      {surveyData.length > 0 && (
        <>
          <div className="row">
            <Table striped hover size="sm">
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>#</th>
                  <th>Respondent</th>
                  <th>Mobile</th>
                  <th>Date Time</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>A1</th>
                  <th>A2</th>
                  <th>A3</th>
                  <th>A4</th>
                  <th>A5</th>
                  <th>A6</th>
                  <th>A7</th>
                  <th>A8</th>
                  <th>A9</th>
                  <th>A10</th>
                  <th>A12</th>
                  <th>A13</th>
                  <th>A14</th>
                  <th>A15</th>
                  <th>A16</th>
                  <th>A17</th>
                  <th>A18</th>
                  <th>A19</th>
                  <th>A20</th>
                  <th>A21</th>
                  <th>A22</th>
                  <th>RECORD_ID</th>

                </tr>
              </thead>
              <tbody>
                {surveyData.map((data, index) => (
                  <tr key={index}>
                    <td>
                    <Button variant="secondary"  onClick={() =>
                 actionOnCLick(data)
                
                }
                >Action</Button >{' '}
                    </td>
                    <td>{index + 1}</td>
                    <td>{data.RESPONDENT}</td>
                    <td>{data.MOBILE}</td>
                    <td>{data.DATETIME}</td>
                    <td>{data.LAT}</td>
                    <td>{data.LONGITUDE}</td>

                    <td>{data.A1}</td>
                    <td>{data.A2}</td>
                    <td>{data.A3}</td>
                    <td>{data.A4}</td>
                    <td>{data.A5}</td>
                    <td>{data.A6}</td>
                    <td>{data.A7}</td>
                    <td>{data.A8}</td>
                    <td>{data.A9}</td>
                    <td>{data.A10}</td>
                    <td>{data.A11}</td>
                    <td>{data.A12}</td>
                    <td>{data.A13}</td>
                    <td>{data.A14}</td>
                    <td>{data.A15}</td>
                    <td>{data.A16}</td>
                    <td>{data.A17}</td>
                    <td>{data.A18}</td>
                    <td>{data.A19}</td>
                    <td>{data.A20}</td>
                    <td>{data.A21}</td>
                    <td>{data.A22}</td>
                    <td>{data.RECORD_ID}</td>
                  </tr>
                ))}
              </tbody>
</Table>
          </div>

          <div className="row">
            <Map
              google={google}
              initialCenter={{
                lat: surveyData[0].LAT,
                lng: surveyData[0].LONGITUDE,
              }}
              containerStyle={{ width: "80vw", height: "80vh" }}
              // @ts-ignore
              mapTypeControl={false}
              streetViewControl={false}
            >
              {surveyData.map((marker, index) => {
                return (
                  <Marker
                    key={index}
                    // @ts-ignore
                    label={`${index + 1}`}
                    // @ts-ignore
                    title={`${index + 1} ${marker.RESPONDENT.toLowerCase()} (${
                      marker.MOBILE
                    }) ${marker.DATETIME}`}
                    position={{
                      lat: marker.LAT,
                      lng: marker.LONGITUDE,
                    }}
                  />
                );
              })}
            </Map>
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCE1xTn0k-vpSWBSLyfL47GonM-hvX-Y2g",
})(Cluster);
