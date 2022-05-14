import React, { useContext } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Cluster from "../Maps/cluster";
import { FieldWorkers } from "../fieldWorkers";
import ActionDetails from "../Screens/ActionDetails"
import 'bootstrap/dist/css/bootstrap.min.css';
import Reports from "../Screens/Reports";
import ReportResults from "../Screens/ReportResults";
import { GrillDownData } from "../grillDownData";
import { ApproveUsers } from "../ApproveUsers";
import { GetReports } from '../getReports';
import GetReportDetails from '../getReportDetails';
import GetOnCallReportDetails from '../getOnCallReports';
import Login from "../Screens/Login";
import Dashboard from '../Screens/Dashboard';
import { Context } from '../State/Store'
import { Table,Container, Navbar, Button } from "react-bootstrap";
import SignUp from '../Screens/Signup';
export default function Navigation() {
    const [STATE,dispatch] = useContext(Context);
     const navigate = useNavigate()
    debugger;
    let data = sessionStorage.getItem('userDetails') !=null ?  JSON.parse(sessionStorage.getItem('userDetails') || '{}') : {}
    
     console.log('sessionStorage',data)
    // if(window.location.hash !== ''){
    //     window.location.href = window.location.origin;
    // }
    const onSignOut = () => {
        sessionStorage.clear();
        dispatch({
            type: 'UPDATE_LOGIN_DATA',
            payload: { 'status': 'UNAUTHORIZED' }
        })
        navigate('/')
    }
    if(data?.status === 'AUTHORIZED'){
        // dispatch({
        //     type: 'UPDATE_LOGIN_DATA',
        //     payload: { 'status': 'AUTHORIZED','userId':data.ID,'userName':data.USERNAME }
        // })
        return (
        
            <div>
                 <div>
                    <Navbar bg="primary" variant="dark" fixed="top" >
                        <Container>
                            <Navbar.Brand >Welcome : {data.userName}</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                              
                                < Button  variant="danger" onClick={()=>{
                                    onSignOut()
                                }}> Sign Out</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                 </div>
                 <div style={{marginTop:'10vh'}}>
                 <Routes>
                     <Route path="/Dashboard" element={<Dashboard/>} />
                     <Route path="/field-works" element={<FieldWorkers />} />
                     <Route path="/actions"  element={<ActionDetails />} />
                     <Route path="/details" element={<Cluster />} />
                     <Route path="/get-assembly-grill-down-data" element={<GrillDownData />} />
                     <Route path="/get-report-details" element={<GetReportDetails />} />
                     <Route path="/get-reports" element={<GetReports />} />
                     <Route path="/get-Approve-Users" element={<ApproveUsers />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/report-results" element={<ReportResults />} />
                     <Route path="/reports" element={<Reports />} />
                     <Route path='/on-call-report' element={<GetOnCallReportDetails />} />
                 </Routes>
                 </div>
            </div>
             )
    }
    else{
        return (
        <div>

            <Routes><Route path="/" element={<Login />} /></Routes>
            <Routes><Route path="/signUp" element={<SignUp />} /></Routes>
        </div>)
    }
    
}
