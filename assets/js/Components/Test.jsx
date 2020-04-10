import React, { useState } from 'react';


const Test = props => {

    const auth = "eyJraWQiOiJHWmRHeHdMbHF3Sk1HNFlwRzhMd25EUjlVUGhWa09NMlAyRG1GYTBJTHlvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwM2RiNzU1OS00OThhLTQyNjgtOTg1ZS1lZGY3YzhlNjNlYzkiLCJldmVudF9pZCI6IjIwNWM2OWFmLWQ3NWMtNGNkYi1hMDdkLTNmZjhhNGVkMTk0NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYmUub3BhbC5hcGlcL2FwaS5leGVjIiwiYXV0aF90aW1lIjoxNTg2NDIwNjYzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9ZS0FLT05MU0YiLCJleHAiOjE1ODY0MjQyNjMsImlhdCI6MTU4NjQyMDY2MywidmVyc2lvbiI6MiwianRpIjoiZDZiM2NlMDktZGQxZC00YzRkLWI3NjMtMzA1NTIxZDE0Y2E0IiwiY2xpZW50X2lkIjoiMzY1cm5ucTViYnE0YTBrcnIyaHBpYXRsaHIiLCJ1c2VybmFtZSI6InJvYmluIn0.WnGj2R26w1tByKGk0rmf03qXoJEwgO5v3izp7OXBg_LoD4l1Z6XgjzDcjlQtpYKYPUD22w587qXlj4ikhVPwaCahMVChaP70tuZ4wC9lf-W_iHJ-q0w55lwgwFzrqPubvwdT1jRufDjqweJ92Woq4ORQ3lIAcvnWiZquwhtly3ZRvUDu2FH4d7ZbRHEvwU_qOLNaWpl0EVk6bp2NFqXiQIQThUT2U_AhAWPD-HBXcIqQXuEsE7r1vDYXof-5WLl-IIJHMdKOwYKoLg7OPwNn3DCbR7IK7ucHkOlQsL3F01qhNUcVcFvb4sxWQSBctl_mtdK4GAQPnsqkdRjd4IKkYQ";
    const api = "pTS7BOf5om6rdHWjOYv649DakKAU9l4B6fnL2Fqe";
    const url = "https://80q2kxxmp6.execute-api.us-east-1.amazonaws.com/";
    
    var apigClientFactory = require('aws-api-gateway-client').default;
    var apigClient = apigClientFactory.newClient({
        invokeUrl:url,
        region: 'eu-west-1',
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