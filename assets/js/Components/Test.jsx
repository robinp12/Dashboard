import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Popup from "reactjs-popup";



const Test = props => {

    const [datas, setDatas] = useState({});
    const auth = "eyJraWQiOiJHWmRHeHdMbHF3Sk1HNFlwRzhMd25EUjlVUGhWa09NMlAyRG1GYTBJTHlvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMjc3ZTc2MC1mMGI1LTRlYjEtOGIwYy0xMTRjZjFhNjk2NGQiLCJldmVudF9pZCI6IjdhY2UwNGE2LTY3OTctNGQxMi1hY2UyLThkNjBhM2VkNTVjYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYmUub3BhbC5hcGlcL2FwaS5leGVjIiwiYXV0aF90aW1lIjoxNTg3MTA3NjE3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9ZS0FLT05MU0YiLCJleHAiOjE1ODcxMTEyMTcsImlhdCI6MTU4NzEwNzYxNywidmVyc2lvbiI6MiwianRpIjoiZGI5NWIwYTgtMmIwMy00NDk1LWI0MzUtZWI2MDk5Njg3M2EzIiwiY2xpZW50X2lkIjoiMzY1cm5ucTViYnE0YTBrcnIyaHBpYXRsaHIiLCJ1c2VybmFtZSI6Im9wc28ifQ.A5kYIZk3H-ru7cLZ_dryc6Y5RzF9rLQ2306fKngBN_Zw1gKsbSLFYeF-79qwgGG8gH_WcFMJZBdUty-upbteNCtxWn5HXlMv3AZt_S8QDYZTSxZIl_GDzpT5PSyWtqzOQxJM6vznCqGkmb01BytL51Io0VSJqi9SF71vorYpbcNqOuV2NP-HheRZpe01LIpvrnS31zQUq9_QGiVrDIhtc-LtmuuWR-f5fpjWLfSrLL9xYjvNDNM-iHQQhBEOo4n4lThnf3C_5Ff_NAOG2ahGbQVEPL3ph5ZU6YSvfgAjF8qY5SAgW4d7uXRIaau2YH2lQ6WQZeNf-sYpX2CoaA4Dhw";
    const api = "pTS7BOf5om6rdHWjOYv649DakKAU9l4B6fnL2Fqe";
    const url = "https://80q2kxxmp6.execute-api.us-east-1.amazonaws.com/";
    
    var apigClientFactory = require("aws-api-gateway-client").default;
    var apigClient = apigClientFactory.newClient({
        invokeUrl:url,
        region: 'eu-east-1',
        accessKey: api,         
        sessionToken: auth,
    });
    var pathParams = {
       
    };
    var pathTemplate = 'awsls1/metrics/reference/3875';
    var method = 'GET';
    var additionalParams = {
        //If there are query parameters or headers that need to be sent with the request you can add them here
        headers: {
            "Authorization": auth,
            "x-api-key": api
        }
    };
    var body = {
        service : 2,
        reference: 1792,
        value: 20,
        token: "secret",
        timestamp: "2019-09-15T10:00:00+02:00"
    }
    useEffect(() => {
        apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams,body)
            .then(rep => rep)    
            .then(data => setDatas(data))
            .catch(error => {
                console.log(error);
                toast(error +"",{
                    className: 'bg-red',
                })
            });
            }, []);
    
    return ( <>
    <div>
        <Popup
        trigger={<button className="button"> Trigger 1 </button>}
        position="right"
        closeOnDocumentClick
        >
            <div className="popup">
            <span>Voulez-vous vraiment supprimer l'element ?</span>
            <button className="btn btn-outline-danger mr-1">Oui</button>
            <button className="btn btn-outline-secondary ml-1">Non</button>

            </div>
        </Popup>
        {console.log(datas)}
        </div>
        </>
     );
}
 
export default Test;