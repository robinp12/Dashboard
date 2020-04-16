import React, { useState } from 'react';


const Test = props => {

    const auth = "eyJraWQiOiJHWmRHeHdMbHF3Sk1HNFlwRzhMd25EUjlVUGhWa09NMlAyRG1GYTBJTHlvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiNjg0YjQzZS0yYTc3LTQ2ZjUtYjM5NC0xNGZlMzY2YmEzNjUiLCJldmVudF9pZCI6IjlhYjU3YTQ2LTFjY2ItNGVjNi04OTI1LWFjZjIzMGUzZDNkYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYmUub3BhbC5hcGlcL2FwaS5leGVjIiwiYXV0aF90aW1lIjoxNTg3MDc3MDQ0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9ZS0FLT05MU0YiLCJleHAiOjE1ODcwODA2NDQsImlhdCI6MTU4NzA3NzA0NCwidmVyc2lvbiI6MiwianRpIjoiMTE1Y2RmMGUtNWQ5Ny00YjZmLWJhMDEtOTM1MTY5Y2RlNmEwIiwiY2xpZW50X2lkIjoiMzY1cm5ucTViYnE0YTBrcnIyaHBpYXRsaHIiLCJ1c2VybmFtZSI6InBoaWwifQ.Cv1KQ4wXUmu_QxQaFDiWSMwXYfsiJy3jDK_ktt5erDk0oe4LWNcxnsUgn-WnUhxecESVmhJZfOiyTWp-2GBxcrHXb6Q_ZPlyTZXCJ3cG4cdm87ZRQAv4FWJGGXJfhpWwsT8lA-wfMESl66th3rF_zIbVUiEipq08gCpqZjCb0BflScxoAg7xTLbxt80DZM9ctNmUbLhpAiL1lTRvz-0LnQI2csmCmb1RJsSIzjWyK0DtFOvrc24YTk1uTi1N5-YEOCWCcAd35BuL8HwnjtqjudOtJCHH81OeyaVhL0_qh98UoWd9r00C-LNpvaEVypRWEM2PyWKbxlspXi9ZF9_6SQ";
    const api = "pTS7BOf5om6rdHWjOYv649DakKAU9l4B6fnL2Fqe";
    const url = "https://80q2kxxmp6.execute-api.us-east-1.amazonaws.com/";
    
    var apigClientFactory = require('aws-api-gateway-client').default;
    var apigClient = apigClientFactory.newClient({
        invokeUrl:url,
        region: 'us-east-1',
        accessKey: api,         
        sessionToken: auth,
    });
    var pathParams = {
        //This is where path request params go. 
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
    apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams,body)
    .then(function(result){
        console.log(result)    
    }).catch( function(result){
        console.log(result)    
    });

    return ( <>
        Test
        </>
     );
}
 
export default Test;
