import React, { useState } from 'react';


const Test = props => {

    const auth = "eyJraWQiOiJHWmRHeHdMbHF3Sk1HNFlwRzhMd25EUjlVUGhWa09NMlAyRG1GYTBJTHlvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwM2RiNzU1OS00OThhLTQyNjgtOTg1ZS1lZGY3YzhlNjNlYzkiLCJldmVudF9pZCI6ImMzY2QzYTM2LTJiOWQtNGM5MC05OWI3LTM0NjQ5NWMxZGQ1MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYmUub3BhbC5hcGlcL2FwaS5leGVjIiwiYXV0aF90aW1lIjoxNTg2NTMyMTk4LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9ZS0FLT05MU0YiLCJleHAiOjE1ODY1MzU3OTgsImlhdCI6MTU4NjUzMjE5OCwidmVyc2lvbiI6MiwianRpIjoiNTZjZjM2YmMtMzcyOC00NDgwLThkMzQtZjJkOTU5MWQyZmIyIiwiY2xpZW50X2lkIjoiMzY1cm5ucTViYnE0YTBrcnIyaHBpYXRsaHIiLCJ1c2VybmFtZSI6InJvYmluIn0.YrcdVw3JZ_ZdMu13LkhUb3sy90KBBB0vCQDfboZko-CssapXPbSbjUYIzRXcygp8Bq_40hEaxoWnZ-uw0SRj-Cqc3jMDtYtXiLGGoz2XQ8NBQ2H3MYw1U3FhMS0Pok33gLitDCxfqAlGOrK8XV22m3ffQI_2UiZb6nh41-QodjVLcEkYDaFjEAhyKjRMzPaZIeEdl--ViHMj44h22Y8K2bwQxqMbxj9NwYVvZ4vT_F0YKaZHfwicYqws_bIwBDTUwSoRlcVrgvy0KmBeNasXJKkMl4n6pD5D-EhjsoBwCHUnAdZWbpfPP2Ewzqoj7qx9AxiH8Rhh0UQO-tIJhNRhuw";
    const api = "pTS7BOf5om6rdHWjOYv649DakKAU9l4B6fnL2Fqe";
    const url = "https://80q2kxxmp6.execute-api.us-east-1.amazonaws.com/";
    
    var apigClientFactory = require('aws-api-gateway-client').default;
    var apigClient = apigClientFactory.newClient({
        invokeUrl:url,
        region: 'eu-east-1',
        accessKey: api,         
        sessionToken: auth,
    });
    var pathParams = {
        //This is where path request params go. 
    };
    var pathTemplate = 'awsls1/push'
    var method = 'POST';
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