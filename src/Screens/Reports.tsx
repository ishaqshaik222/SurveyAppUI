import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../Helpers/Constants";

const Reports=()=>{
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const fetchReportsData = async () => {
        const URL = `${BASE_URL}/getReportsIndividual.php`
        fetch(`${BASE_URL}/getReportsIndividual.php`,  {
            method: 'GET',
            headers: {
                "content-type": "application/json",
              },
          })
            .then(response => response.text())
            .then(result => {
                let resultData = JSON.parse(result);
                // console.log('result',resultData)
                setData(resultData.response.REPORT)
            })
            .catch(error => console.log('error', error));
        };
    
    const submitQuery=(query: any)=>{
        navigate('/report-results', { state: query });
    }
    useEffect(() => {
        fetchReportsData()
    }, [])
    return (
        <div style={{display:'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     flexDirection: 'column'
                     }}>
            <h1>Reports</h1>             
            <div style={{width:'90vw'}}>
                <Table bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>MODULE</th>
                    <th>REPORT_NAME</th>
                    </tr>
                </thead>
                <tbody>
                {
                // JSON.stringify(data)
                data.map((item,index)=>{
                    return (
                        <tr key={index.toString()}>
                        <td >{index+1}</td>
                        <td>{item['MODULE']} </td>
                        <td>{item['REPORT_NAME']} </td>
                        <td><button onClick={()=>{submitQuery(item['QUERY'])}}>Pull Report</button></td>
                        </tr>
                    )
                    })
                }
                </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Reports
