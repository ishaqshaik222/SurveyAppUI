import React, { useCallback, useContext, useState } from "react";
import { Form, Row, Col, Button, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Helpers/Constants";
import {Context} from '../State/Store'


const SignUp = () => {
    const [STATE, dispatch] = useContext(Context)
    console.log("STATE",STATE)
    const navigate = useNavigate();
    //  dispatch({type: 'TYPE', payload: {data: 'to update'}})
    const onSignup= ()=>{
     debugger
        if(formData.username!=''&& formData.fname!="" && formData.password!=""&&formData.email!=""){
            console.log(formData)
            navigate('/');

            try {
       
                 fetch(`${BASE_URL}/SurveyAppSignUp.php`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(
                      formData
                  ),
                }).then(response=>response.text())
                .then(result=>{
                    let resultData=JSON.parse(result);
                    if(resultData.status=="success"){
                        navigate('/');
                    }
                })
                   
              } catch (error) {
                console.log({ error });
              } finally {
                
              }
        }
       
    }

    const [formData, setFormData] = useState({
        
        "username":"",
        "password":"",
        // "status":"",
        "fname":"",
        "lname":"",
        "mname":"",
        "email":""

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
            <h1>SignUp</h1>
            <Row className="justify-content-md-center">
                <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter Username"
                    defaultValue=""
                    value={formData.username} onChange={(value)=>onChangeText('username',value.target.value)} 
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

                {/* <Form.Group className="mb-3">
                <Form.Label>Status *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter Status"
                    defaultValue=""
                    value={formData.status} onChange={(value)=>onChangeText('status',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group className="mb-3">
                <Form.Label>FirstName *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter FirstName"
                    defaultValue=""
                    value={formData.fname} onChange={(value)=>onChangeText('fname',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>LastName *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter LastName"
                    defaultValue=""
                    value={formData.lname} onChange={(value)=>onChangeText('lname',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>MiddleName *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter MiddleName"
                    defaultValue=""
                    value={formData.mname} onChange={(value)=>onChangeText('mname',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter Email"
                    defaultValue=""
                    value={formData.email} onChange={(value)=>onChangeText('email',value.target.value)} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Stack direction="horizontal" gap={3}>
                {/* <Button variant="primary" onClick={()=>onSubmit()}>Login</Button> */}
                { <div className="vr" /> }
                { <Button variant="primary" onClick={()=>onSignup()}>Sign up</Button> }
            </Stack>
        </Container>
    );
}

export default SignUp;