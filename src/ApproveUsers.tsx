import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "./custom-hooks";
import { config } from './Constants';

//const BASE_URL = config.url.API_URL


export const ApproveUsers=()=>{
    const [Approveuser, setApproveuserData] = useState([]);
debugger

    const user1=[];

        const users= [
          {
            "userId": 1,
            "firstName": "Krish",
            "lastName": "Lee",
            "phoneNumber": "123456",
            "emailAddress": "krish.lee@learningcontainer.com"
          },
          {
            "userId": 2,
            "firstName": "racks",
            "lastName": "jacson",
            "phoneNumber": "123456",
            "emailAddress": "racks.jacson@learningcontainer.com"
          },
          {
            "userId": 3,
            "firstName": "denial",
            "lastName": "roast",
            "phoneNumber": "33333333",
            "emailAddress": "denial.roast@learningcontainer.com"
          },
          {
            "userId": 4,
            "firstName": "devid",
            "lastName": "neo",
            "phoneNumber": "222222222",
            "emailAddress": "devid.neo@learningcontainer.com"
          },
          {
            "userId": 5,
            "firstName": "jone",
            "lastName": "mac",
            "phoneNumber": "111111111",
            "emailAddress": "jone.mac@learningcontainer.com"
          }
        ]

        if (users.length === 0) {
            return <h1>No Data found!</h1>;
          }

    return(
        <div className="container p-5">
      <div className="row">
          <h1>Showing Records For {users.length} Approved Users</h1>
        <table className="table">
          <thead>
              <tr>
                  <td>UserId</td>
                  <td>FirstName</td>
                  <td>LastName</td>
                  <td>PhoneNumber</td>
                  <td>Email</td>
              </tr>
          </thead>
          <tbody>
              {users.map((data,index)=>(
                <tr
                key={index}
                style={{ cursor: "pointer" }} 
                >                      
                      <td>{index+1}</td>
                      <td>{data.userId}</td>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.emailAddress}</td>
                  </tr>
              ))}
          </tbody>
          </table>
          </div>
          </div>
    );
};