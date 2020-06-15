import { toast } from "react-toastify";
import Cache from "./cache";

import("aws-sdk/clients/codecommit").CreatePullRequestApprovalRuleInput;

//Requete sur l'api careboard grace a un parametre de reference
function RequestAPI(ref) {
  const auth = localStorage.getItem(
    "CognitoIdentityServiceProvider.365rnnq5bbq4a0krr2hpiatlhr.phil.accessToken"
  );
  const api = "pTS7BOf5om6rdHWjOYv649DakKAU9l4B6fnL2Fqe";
  const url =
    "https://80q2kxxmp6.execute-api.us-east-1.amazonaws.com/awsls1/metrics/reference/" +
    ref +
    "?maxEntries=20";
  const fetchDatas = async () => {
    var apigClientFactory = require("aws-api-gateway-client").default;
    var apigClient = apigClientFactory.newClient({
      invokeUrl: url,
      region: "eu-east-1",
      accessKey: api,
      sessionToken: auth,
    });
    var pathParams = {};
    var pathTemplate = "";
    var method = "GET";
    var additionalParams = {
      //If there are query parameters or headers that need to be sent with the request you can add them here
      headers: {
        Authorization: auth,
        "x-api-key": api,
      },
    };
    var body = {};
    //Verifier si le resultat se trouve deja en cache
    const cachedDatas = await Cache.get("ref"+ref);
    if (cachedDatas) {
      return cachedDatas;
    } else {
      var datas = await apigClient
        .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
        .then((e) => {
          // Mise en cache apres requete
          Cache.set("ref"+ref, e.data.datapoints);
          return e.data.datapoints;
        })
        .catch((err) => {
          //Notification d'erreur
          toast("Erreur de connexion à l'API, essayer de vous reconnecter.", {
            className: "bg-red",
          });
        });
      return datas;
    }
  };
    return fetchDatas();
}

export default RequestAPI;
