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
import { useNavigate } from "react-router-dom";
import { ExportToCSV } from "./ExportCSV";

const BASE_URL = config.url.API_URL

export class excel{
  Sno:string="";
  InterviewerName:string="";
  InterviewerMobile:string="";
  Respodent:string="";
  RespodentMobile:string="";
  DateTime:string="";
  AssemblyCode:string="";
  AssemblyName:string="";
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
 

}

interface Props extends IProvidedProps {}

export const GetReportDetails = ({ google }: Props) => {
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const [reportDetailsWorker, setReportDetailsWorkerData] = useState<any[]>([]);
  const [fieldWorkerLoading, setFieldWorkerLoading] = useState(false);


  const [excelLogs1, setexcelLogs1] = useState([]);

  const filename='Report-Details'

   const excelLogs:any=[];

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
          state: queryParams.get("state"),
        }),
      });

      const json = await res.json();
      debugger
      setReportDetailsWorkerData(json.response.REPORT);

      for (let i = 0; i <= json.response.REPORT.length; i++) {

        const excel1=new excel();
        if(json.response.REPORT[i]!=undefined){

          excel1.Sno=(i+1).toString();
          excel1.InterviewerName=json.response.REPORT[i].FIRST_NAME;
          excel1.InterviewerMobile=json.response.REPORT[i].MOBILE;
          excel1.Respodent=json.response.REPORT[i].RESPONDENT;
          excel1.RespodentMobile=json.response.REPORT[i].RESPONDENT_MOBILE;
          excel1.DateTime=json.response.REPORT[i].DATETIME;
          excel1.AssemblyCode=json.response.REPORT[i].ASSEMBLY_CODE;
          excel1.AssemblyName=json.response.REPORT[i].ASSEMBLY_NAME;
          excel1.Latitude=json.response.REPORT[i].LATITUDE;
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

          excelLogs.push(excel1);

        }
        debugger
      }

    } catch (error) {
      console.log({ error });
    } finally {
      setFieldWorkerLoading(false);
    }
    setexcelLogs1(excelLogs);
  };

  useEffect(() => {
    getreportDetailsWorker();
  }, []);

  const actionOnCLick = (data:any)=>{
    const managerId =  queryParams.get("managerId")?.toString();
    navigate(`/actions?RId=${data.RECORD_ID}&managerId=${managerId}`);
  }

  if (fieldWorkerLoading) {
    return <h1>Loading...</h1>;
  }

  if (reportDetailsWorker.length === 0) {
    return <h1>No Data found!</h1>;
  }

  return (
    <div className="container p-5">
      <div className="row">
      <div className="col-md-3">
                <ExportToCSV csvData={excelLogs1} fileName={filename} />
          </div>
        <table className="table">
          <thead>
            <tr style={{ position: "sticky", top: 0, background:"#fff" }}>
                <th>#</th>
                <th>Sno</th>
                <th>Interviewer Name</th>
                <th>Interviewer Mobile</th>

                <th>Respondent</th>
                <th>Respondent Mobile</th>
                <th>Date Time</th>

                <th>Assembly Code</th>
                <th>Assembly Name</th>
                
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
                <td>
                  <Button variant="secondary" onClick={() =>
                    actionOnCLick(data)

                  }
                  >Action</Button >{' '}
                </td>
                    <td>{index + 1}</td>
                    <td>{data.FIRST_NAME}</td>
                    <td>{data.MOBILE}</td>
                    <td>{data.RESPONDENT}</td>
                    <td>{data.RESPONDENT_MOBILE}</td>
                    <td>{data.DATETIME}</td>
                    <td>{data.ASSEMBLY_CODE}</td>
                    <td>{data.ASSEMBLY_NAME}</td>
                    
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
                let LAT_LONG_TYPE = marker.LAT_LONG_TYPE ;
                let newMarker;
                if (LAT_LONG_TYPE === "Booth_lat_long" ) {
                  newMarker = <Marker
                  
                  key={index}
                  // @ts-ignore
                  label={`${marker.BOOT_NO}`}
                  // @ts-ignore
                  title={`${index + 1} ${marker.BOOT_NO} ${marker.RESPONDENT.toLowerCase()} (${
                    marker.MOBILE
                  }) ${marker.DATETIME}`}
                  position={{
                    lat: marker.LATITUDE,
                    lng: marker.LONGITUDE,
                  }}
                  icon={{

                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' 
            
                  }}
                  />
                } else {
                    //Set here your icon in base the condition
                    newMarker = <Marker
                  
                      key={index}
                      // @ts-ignore
                      // @ts-ignore
                      title={`${index + 1} ${marker.RESPONDENT.toLowerCase()} (${
                        marker.MOBILE
                      }) ${marker.DATETIME}`}
                      position={{
                        lat: marker.LATITUDE,
                        lng: marker.LONGITUDE,
                      }}
                      icon={{
    
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' 
                
                      }}
                  />

                }
                return (
                  
                  newMarker
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
