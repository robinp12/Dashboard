import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import('aws-sdk/clients/codecommit').CreatePullRequestApprovalRuleInput 

async function RequestAPI(ref){
        
        const [datas, setDatas] = useState([])
        const auth = localStorage.getItem("CognitoIdentityServiceProvider.365rnnq5bbq4a0krr2hpiatlhr.phil.accessToken");
        const api = "pTS7BOf5om6rdHWjOYv649DakKAU9l4B6fnL2Fqe";
        const url = "https://80q2kxxmp6.execute-api.us-east-1.amazonaws.com/awsls1/metrics/reference/"+ref+"?maxEntries=10";
        const fetchDatas = () => {
            var apigClientFactory = require("aws-api-gateway-client").default;
            var apigClient = apigClientFactory.newClient({
                    invokeUrl:url,
                    region: 'eu-east-1',
                    accessKey: api,         
                    sessionToken: auth,
                });
                var pathParams = {
                };
                var pathTemplate = '';
                var method = 'GET';
                var additionalParams = {
                    //If there are query parameters or headers that need to be sent with the request you can add them here
                    headers: {
                        "Authorization": auth,
                        "x-api-key": api
                    },
                };
                var body = {
                    pastDays: 45,
                    maxEntries: 10,
                }
                apigClient
                    .invokeApi(pathParams, pathTemplate, method, additionalParams,body)
                    .then(rep => {
                        setDatas(rep.data)
                    })
                    .catch(err => {
                        toast("Erreur de connexion à l'API ",{
                            className: 'bg-red',
                        });
                        console.log(err)
                    })
        }

        useEffect(()=>{
            fetchDatas();
        },[])
    
        return datas;
    }
export default RequestAPI;