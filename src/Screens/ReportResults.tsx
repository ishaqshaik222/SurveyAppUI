import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BASE_URL from "../Helpers/Constants";

const ReportResults=(props:any)=> {
    const { state } = useLocation();
    const [headers, setHeaders] = useState<Array<string>>([]);
    const [rowData, setRowData] = useState<Array<string>>([]);

    const fetchReportResultData = async () => {
        const URL = `${BASE_URL}/getReportsResults.php`
        fetch(URL, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
              },
            body: JSON.stringify({
                query: state,
            }),
          })
            .then(response => response.text())
            .then(result => {
                let resultData = JSON.parse(result);
                const headers = Object.keys(resultData.response[0]);
                console.log('row data', resultData.response)
                console.log('headers', headers)
                setRowData(resultData.response)
                setHeaders(headers)
                // setData(resultData.response.REPORT)
            })
            .catch(error => console.log('error', error));
        };
    useEffect(() => {
        fetchReportResultData()
    }, [])
    return (
        // <div style={{display:'flex',
        //              alignItems: 'center',
        //              justifyContent: 'center',
        //              flexDirection: 'column'
        //              }}>
        //     <h1>Reports</h1>             
        //     <div style={{width:'90vw'}}>
                // <Table bordered hover>
                // <thead>
                //     <tr>
                //     <th>#</th>
                //     <th>ACCESS_LEVEL</th>
                //     <th>MODULE</th>
                //     <th>REPORT_ID</th>
                //     <th>REPORT_NAME</th>
                //     <th>QUERY</th>
                //     </tr>
                // </thead>
                // <tbody>
                //     <tr>
                //     <td>{index+1}</td>
                //     <td>{item['ACCESS_LEVEL']} </td>
                //     <td>{item['MODULE']} </td>
                //     <td>{item['REPORT_ID']} </td>
                //     <td>{item['REPORT_NAME']} </td>
                //     <td>{item['QUERY']} </td>
                //     <td><button onClick={()=>{submitQuery(item['QUERY'])}}>Execute</button></td>
                //     </tr>
                // </tbody>
                // </Table>
        //     </div>
        // </div>


        <div style={{display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
        }} >
            <div style={{width:'90vw'}}>
            <h1>Reports Results</h1>
            <Table bordered hover>
                <thead>
               
                    {
                
                headers.length > 0 ? 
                <tr>
                    {
                    headers.map((item, index)=>{
                        return (<th>{item}</th>)
                    })}
                </tr>
                :
                <></>
                    }
                </thead>
                <tbody>
                    {
                        rowData.length >0 ? 
                            rowData.map((rowItem,index)=>{
                                return (
                                    <tr key={index.toString()}> 
                                    {headers.map((headerItem:any,index:any)=>{
                                        return <td>{rowItem[headerItem]} </td>
                                    })}
                                    </tr>
                                )
                            })
                        :
                        <></>
                    }
                </tbody>
                </Table>
            
            </div>
        </div>
    )
}

export default ReportResults
