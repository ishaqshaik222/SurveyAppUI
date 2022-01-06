import { useEffect, useState,useCallback } from "react";
import {
  Map,
  Marker,
  IProvidedProps,
  GoogleApiWrapper,
} from "google-maps-react";
import moment from "moment";
import { useQueryParams } from "../custom-hooks";
import { Button,Table,Form} from "react-bootstrap";


const ActionDetails = () => {
    
const BASE_URL = "http://3.109.197.149/projects/survey_app/api";
    const queryParams = useQueryParams();
    const RID =  queryParams.get("RId")?.toString();


    const [formData, setFormData] = useState({
        
        'recordId':RID,
        'comments':"",
        'auditType':"",
        'status':"Valid",
        'createdBy': queryParams.get("managerId")?.toString(),

    })
    const onSubmit = () => {
      console.log(formData)
      getFieldWorkers();
      alert('Data Submitted Successfully')
    }
    const onChangeText = useCallback((key,value) => {
        console.log("value",value)
        setFormData((prev)=>{
            return{
                ...prev,
                [key]: value,
            }
        })
    }, [formData])

    const getFieldWorkers = async () => {
        try {
       
          const res = await fetch(`${BASE_URL}/saveActionComments.php`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(
                formData
            ),
          });
    
        
        
        } catch (error) {
          console.log({ error });
        } finally {
          
        }
      };

    //   useEffect(() => {
    //     getFieldWorkers();
    //   }, []);
    return (
        <div className="container p-5">
        <div className="row">
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Record Id</Form.Label>
                    <Form.Control  value={RID} type="text" placeholder="Record Id" readOnly  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStatus">
                    <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(dp)=>onChangeText('status',dp.target.value)}>
                               
                                <option value="Valid">Valid</option>
                                <option value="In Valid">In Valid</option>
                                <option value="Need Review">Need Review</option>
                            </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicComments" >
                    <Form.Label>Comments</Form.Label>
                    <Form.Control type="text" placeholder="Comments"  value={formData.comments} onChange={(value)=>onChangeText('comments',value.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicComments">
                    <Form.Label>Auditor Type</Form.Label>
                    <Form.Control type="text" placeholder="Auditor Type" value={formData.auditType} onChange={(value)=>onChangeText('auditType',value.target.value)}  />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </div>
        </div>
    )
}

export default ActionDetails