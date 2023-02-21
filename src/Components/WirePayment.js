import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";



export const WirePayment = () => {
    const[accountId,setAccountId]=useState("")
    const[cirecleAccountNumber,setCircleAccountNumber] = useState("")
    const[trackingId,setTrackingId] = useState("")
    const baseUrl = "https://api-sandbox.circle.com/";
    const API_KEY = "QVBJX0tFWTo3YTQzZDFkYTA0ODQyMDUyZGE3MTljNzNhOTIzMTVhZTozYTU0YjgxNTRiN2YxODVlNzRhODBhNzI5ZjFiMTkxMQ=="

    async function createWireAccount() {
        const num=uuidv4()
        console.log(num,"Idempotency key");
       
        let data = {
            "idempotencyKey": num,
            "accountNumber": "12340010",
            "routingNumber": "121000248",
            "billingDetails": {
              "name": "Satoshi Nakamoto",
              "city": "Boston", 
              "country": "US",
              "line1": "100 Money Street",
              "postalCode": "01234",
              "line2": "Suite 1",
              "district": "MA"
            },
            "bankAddress": {
              "country": "US",
              "bankName": "SAN FRANCISCO",
              "city": "SAN FRANCISCO",
              "line1": "100 Money Street",
              "line2": "Suite 1",
              "district": "CA"
            }
          }
        // console.log(newWireAccount);
        await axios
            .post(
                `${baseUrl}v1/businessAccount/banks/wires` ,data,{
                headers: {      
                    'Content-Type': 'application/json',
                    Accept:'application/json',
                    'Authorization' : ` Bearer ${API_KEY}`,
                 } }
            )

            .then((res) => {
                console.log(res.data.data.id
                    , "//New Wire Account created successfully ");
                    console.log(res,"********************");
                    setAccountId(res.data.data.id)
                    setTrackingId(res.data.data.setTrackingId)



            })
            .catch((err) => {
                console.log(err, "err");
            });     
    }
    async function getWireAccountStatus(){
        console.log(accountId);
        const data= await axios.get(`${baseUrl}v1/businessAccount/banks/wires/${accountId}`,{
            headers: {      
                'Content-Type': 'application/json',
                Accept:'application/json',
                'Authorization' : `Bearer ${API_KEY}`,
             } })
             alert("Wire Account Status",data.data.data.status)

        console.log(data,"current status");
    }

     async function getWireInstruction(){

        const payload= await axios.get(`${baseUrl}/v1/businessAccount/banks/wires/${accountId}/instructions`,{
            headers:{
                'Content-Type': 'application/json',
                Accept:'application/json',
                'Authorization' : `Bearer ${API_KEY}`,
            }
        })
        console.log(payload,"Get wire instruction data");
         console.log(payload.data.data.beneficiaryBank.accountNumber);
        setCircleAccountNumber(payload.data.data.beneficiaryBank.accountNumber)
         
    }
     async function sendWireTransaction(){
        const Payload={
            "trackingRef": trackingId,
            "amount": {
              "amount": "20",
              "currency": "USD"
            },
            "beneficiaryBank": {
              "accountNumber": cirecleAccountNumber
            }
          }
        const wireTransaction= await axios.post(`${baseUrl}/v1/mocks/payments/wire`,Payload,{
            headers: {      
                'Content-Type': 'application/json',
                Accept:'application/json',
                'Authorization' : ` Bearer ${API_KEY}`,
             } }) 
             console.log(wireTransaction,"Send 10 USD successfully");

    }

    return (
        <div>
            <div>WirePayment</div>
            <button onClick={createWireAccount} >Create Account</button>
            <button onClick={getWireAccountStatus} style={{marginLeft:"831px"}}>Check current status</button>
           <button onClick={getWireInstruction}> Get Circle Account number</button>
                <button onClick={sendWireTransaction}>SendWireTransaction</button>
                
                  
        </div>
    );
};
