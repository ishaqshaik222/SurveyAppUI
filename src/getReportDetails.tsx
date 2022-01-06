/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useQueryParams } from "./custom-hooks";
import { config } from './Constants';
import {
  Map,
  Marker,
  IProvidedProps,
  GoogleApiWrapper,
} from "google-maps-react";
import { Button,Table} from "react-bootstrap";

const BASE_URL = config.url.API_URL
interface Props extends IProvidedProps {}

export const GetReportDetails = ({ google }: Props) => {
  const queryParams = useQueryParams();

  const [reportDetailsWorker, setReportDetailsWorkerData] = useState<any[]>([]);
  const [fieldWorkerLoading, setFieldWorkerLoading] = useState(false);

  const getreportDetailsWorker = async () => {
    try {
      setFieldWorkerLoading(true);

      const res = await fetch(`${BASE_URL}/getReportDetails.php`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          code: queryParams.get("code"),
          status: queryParams.get("status"),
        }),
      });

      const json = await res.json();

      setReportDetailsWorkerData(json.response.REPORT);
    } catch (error) {
      console.log({ error });
    } finally {
      setFieldWorkerLoading(false);
    }
  };

  useEffect(() => {
    getreportDetailsWorker();
  }, []);


  if (fieldWorkerLoading) {
    return <h1>Loading...</h1>;
  }

  if (reportDetailsWorker.length === 0) {
    return <h1>No Data found!</h1>;
  }

  return (
    <div className="container p-5">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
                <th>#</th>
                <th>Respondent</th>
                <th>Respondent Mobile</th>
                <th>Date Time</th>

                <th>Assembly Code</th>
                <th>Assembly Name</th>
                <th>First Name</th>
                <th>Mobile</th>
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
                <th>A11</th>
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
            {reportDetailsWorker.map((data, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{data.RESPONDENT}</td>
                    <td>{data.RESPONDENT_MOBILE}</td>
                    <td>{data.DATETIME}</td>
                    <td>{data.ASSEMBLY_CODE}</td>
                    <td>{data.ASSEMBLY_NAME}</td>
                    <td>{data.FIRST_NAME}</td>
                    <td>{data.MOBILE}</td>
                    <td>{data.LATITUDE}</td>
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
        </table>
      </div>
      <div className="row">
            <Map
              google={google}
              initialCenter={{
                lat: reportDetailsWorker[0].LATITUDE,
                lng: reportDetailsWorker[0].LONGITUDE,
              }}
              containerStyle={{ width: "80vw", height: "80vh" }}
              // @ts-ignore
              mapTypeControl={false}
              streetViewControl={false}
            >
              {reportDetailsWorker.map((marker, index) => {
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
                      lat: marker.LATITUDE,
                      lng: marker.LONGITUDE,
                    }}
                  />
                );
              })}
            </Map>
          </div>
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyCE1xTn0k-vpSWBSLyfL47GonM-hvX-Y2g",
})(GetReportDetails);
