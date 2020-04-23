global.fetch = require("node-fetch"); //.default;
if (typeof fetch !== "function") {
	console.log("fetch is not a function");
	process.exit(1);
}

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');


// Use Case 4 from https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js
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
	onSuccess: function(result) {
		var accessToken = result.getAccessToken().getJwtToken();

		console.log(accessToken);
		//POTENTIAL: Region needs to be set if not already set previously elsewhere.
		/*AWS.config.region = 'us-east-1';

		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: '...', // your identity pool id here
			Logins: {
				// Change the key below according to the specific region your user pool is in.
				'cognito-idp.us-east-1.amazonaws.com/us-east-1_YKAKONLSF': result
					.getIdToken()
					.getJwtToken(),
			},
		});

		//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
		AWS.config.credentials.refresh(error => {
			if (error) {
				console.error(error);
			} else {
				// Instantiate aws sdk service objects now that the credentials have been updated.
				// example: var s3 = new AWS.S3();
				console.log('Successfully logged!');
			}
		});*/
	},

	onFailure: function(err) {
		console.log(err.message || JSON.stringify(err));
	},
});
