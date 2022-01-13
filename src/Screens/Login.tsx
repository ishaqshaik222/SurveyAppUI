import React, { useCallback, useContext, useState } from "react";
import { Form, Row, Col, Button, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Helpers/Constants";
import {Context} from '../State/Store'


const Login = () => {
    const [STATE, dispatch] = useContext(Context)
    console.log("STATE",STATE)
    const navigate = useNavigate();
    //  dispatch({type: 'TYPE', payload: {data: 'to update'}})
    const onSignup=()=>{
debugger
navigate('/signUp');

    }
    const onSubmit=()=>{
        debugger;
     
        
        if(formData.managerId!=''&& formData.userId!="" && formData.password!=""){
            const URL = `${BASE_URL}/surveyAppLogin.php`
            fetch(URL, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                  },
                body: JSON.stringify(formData),
              })
                .then(response => response.text())
                .then(result => {
                    let resultData = JSON.parse(result);
                    debugger;
                  if(resultData.status==="SUCCESS"){
                    let dbResponse=resultData.response.REPORT[0];
                    dispatch({
                        type:'UPDATE_LOGIN_DATA',
                        payload: {'status':'AUTHORIZED','userId':dbResponse.ID,'userName':dbResponse.USERNAME,'managerId':formData.managerId}
                    })
                    debugger;
                    let sessionData =STATE.user
                    sessionData.status = 'AUTHORIZED';
                    sessionData.userId =dbResponse.ID;
                    sessionData.userName =dbResponse.USERNAME;
                    sessionData.managerId = formData.managerId;
                    sessionStorage.setItem('userDetails' ,JSON.stringify(sessionData) )
                    navigate('/field-works?managerId='+formData.managerId);
                }else{alert("login failed please contact admin")}
                    // setData(resultData.response.REPORT)
                })
                .catch(error => console.log('error', error));
    }else{alert('Manager Id Required')}
    }

    const [formData, setFormData] = useState({
        
        "userId":"",
        "password":"",
        "managerId":""

    })
    const onChangeText = useCallback((key,value) => {
        console.log("value",value)
        setFormData((prev)=>{
            return{
                ...prev,
                [key]: value,
            }
        })
    }, [formData])

    return (
        <Container fluid="xl">
            <h1>Login</h1>
            <Row className="justify-content-md-center">
                <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter Username"
                    defaultValue=""
                    value={formData.userId} onChange={(value)=>onChangeText('userId',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Enter Password"
                    defaultValue=""
                    value={formData.password} onChange={(value)=>onChangeText('password',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Manager Id *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter Manager Id"
                    defaultValue=""
                    value={formData.managerId} onChange={(value)=>onChangeText('managerId',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Stack direction="horizontal" gap={3}>
                <Button variant="primary" onClick={()=>onSubmit()}>Login</Button>
                { <div className="vr" /> }
                { <Button variant="secondary" onClick={()=>onSignup()}>Sign up</Button> }
            </Stack>
        </Container>
    );
}

export default Login;