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
import {ExportToCSV} from '../ExportCSV';


const BASE_URL = "http://3.109.197.149/projects/survey_app/api";



interface Props extends IProvidedProps {}

export class excel{
  Sno:string="";
  Respodent:string="";
  Mobile:string="";
  DateTime:string="";
  Latitude:string="";
  Longitude:string="";
  A1:string="";
  A2:string="";
  A3:string="";
  A4:string="";
  A5:string="";
  A6:string="";
  A7:string="";
  A8:string="";
  A9:string="";
  A10:string="";
  A11:string="";
  A12:string="";
  A13:string="";
  A14:string="";
  A15:string="";
  A16:string="";
  A17:string="";
  A18:string="";
  A19:string="";
  A20:string="";
  A21:string="";
  A22:string="";
  RecordId:string="";
  AuditStatus:string="";
  Comments:string="";

}

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

  const [excelLogs1, setexcelLogs1] = useState([]);

  const filename='Field-Works'

   const excelLogs:any=[];

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
      debugger
      console.log(res)
      const json = await res.json();
      
      if (json.status === "ERROR") {
        setSurveyData([]);
        return;
      }
      setSurveyData(json.response.REPORT);

      for (let i = 0; i <= json.response.REPORT.length; i++) {

        const excel1=new excel();
        if(json.response.REPORT[i]!=undefined){

          excel1.Sno=(i+1).toString();
          excel1.Respodent=json.response.REPORT[i].RESPONDENT;
          excel1.Mobile=json.response.REPORT[i].MOBILE;
          excel1.DateTime=json.response.REPORT[i].DATETIME;
          excel1.Latitude=json.response.REPORT[i].LAT;
          excel1.Longitude=json.response.REPORT[i].LONGITUDE;
          excel1.A1=json.response.REPORT[i].A1;
          excel1.A2=json.response.REPORT[i].A2;
          excel1.A3=json.response.REPORT[i].A3;
          excel1.A4=json.response.REPORT[i].A4;
          excel1.A5=json.response.REPORT[i].A5;
          excel1.A6=json.response.REPORT[i].A6;
          excel1.A7=json.response.REPORT[i].A7;
          excel1.A8=json.response.REPORT[i].A8;
          excel1.A9=json.response.REPORT[i].A9;
          excel1.A10=json.response.REPORT[i].A10;
          excel1.A11=json.response.REPORT[i].A11;
          excel1.A12=json.response.REPORT[i].A12;
          excel1.A13=json.response.REPORT[i].A13;
          excel1.A14=json.response.REPORT[i].A14;
          excel1.A15=json.response.REPORT[i].A15;
          excel1.A16=json.response.REPORT[i].A16;
          excel1.A17=json.response.REPORT[i].A17;
          excel1.A18=json.response.REPORT[i].A18;
          excel1.A19=json.response.REPORT[i].A19;
          excel1.A20=json.response.REPORT[i].A20;
          excel1.A21=json.response.REPORT[i].A21;
          excel1.A22=json.response.REPORT[i].A22;
          excel1.RecordId=json.response.REPORT[i].RECORD_ID;
          excel1.AuditStatus=json.response.REPORT[i].AUDIT_STATUS;
          excel1.Comments=json.response.REPORT[i].COMMENTS;

          excelLogs.push(excel1);

        }
        debugger
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setCalled(true);
      setSurveyDataLoading(false);
    }
    setexcelLogs1(excelLogs);
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
          <div className="col-md-3">
                <ExportToCSV csvData={excelLogs1} fileName={filename} />
          </div>
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
                  <th>Audit Status</th>
                  <th>Comments</th>

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
                    <td>{data.AUDIT_STATUS}</td>
                    <td>{data.COMMENTS}</td>
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
