import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_bwHek97ra",     // e.g., us-east-1_abc123
  ClientId: "jb5k6qmgmuh0vous4385sdhe6"       // e.g., 1h2g3j4k56789abcdef
};

export default new CognitoUserPool(poolData);
