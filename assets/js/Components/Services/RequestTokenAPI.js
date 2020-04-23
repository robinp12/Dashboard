import { useState, useEffect } from 'react';

function requestTokenAPI(){
    const [token, setToken] = useState("");
    useEffect(() => {
        var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
        var authenticationData = {
            Username: 'phil',
            Password: 'ThisIsCovidTime!2',
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
        );
        var poolData = {
            UserPoolId: 'us-east-1_YKAKONLSF', // Your user pool id here
            ClientId: '365rnnq5bbq4a0krr2hpiatlhr', // Your client id here
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username: 'phil',
            Pool: userPool,
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    setToken(result.getAccessToken().getJwtToken());
                },
                onFailure: (err) => {
                    alert(err.message || JSON.stringify(err));
                },
            });
    },[])
    return token;
}

export default requestTokenAPI;