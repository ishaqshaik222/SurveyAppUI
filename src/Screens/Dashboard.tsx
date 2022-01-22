import React, { useEffect, useState } from 'react'
import { Table,Card ,Button} from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import BASE_URL from "../Helpers/Constants";
const Dashboard=(props:any)=>{
    debugger;
    const { state } = useLocation();
    debugger;
    const navigate =useNavigate();
   const navigateToReports =()=>{
    navigate('/reports?managerId='+state);
   }
   const navigateToDrillDownReports =()=>{
    navigate('/get-assembly-grill-down-data?managerId='+state);
   }
   const navigateToApproveUsers =()=>{
    navigate('/get-Approve-Users?managerId='+state);
   }
   const navigateToFieldWorkers =()=>{
    navigate('/field-works?managerId='+state);
   }
    return (
        <div>
            <Card style={{ width: '18rem',float:'left',marginTop: '25px',marginLeft:'20px' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>Reports</Card.Title>
                    <Card.Text>
                        Click below button to navigate to Reports.
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{
                        navigateToReports()
                    }}  >Go to Reports</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem',float:'left',marginTop: '25px',marginLeft:'20px' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>Field Workers</Card.Title>
                    <Card.Text>
                    Click below button to navigate to Field Workers.
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{
                        navigateToFieldWorkers()
                    }}  >Go to Field Workers</Button>
                </Card.Body>
            </Card>
            <Card style={{width: '18rem',float:'left',marginTop: '25px',marginLeft:'20px'}}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>Drill-down Reports</Card.Title>
                    <Card.Text>
                        Click below button to navigate to Drill-down  Reports.
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{
                        navigateToDrillDownReports()
                    }}  >Go to Drill-down Reports</Button>
                </Card.Body>
            </Card>
            <Card style={{width: '18rem',float:'left',marginTop: '25px',marginLeft:'20px'}}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>Approve-users</Card.Title>
                    <Card.Text>
                        Click below button to navigate to Drill-down  Reports.
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{
                        navigateToApproveUsers()
                    }}  >Go to Drill-down Reports</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Dashboard
