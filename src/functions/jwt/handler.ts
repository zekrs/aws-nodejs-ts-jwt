import "source-map-support/register";
import { SignJWT } from "jose/jwt/sign";
import { readFileSync } from "fs";
import { join } from "path";
import { createPrivateKey } from "crypto";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { T_JWTBody, T_JWTHeader } from "./types";
import { config } from "./config";

const generateJwt: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
    const keyPath: string = join(__dirname, "static", config.keyFileName);

    const key: string = readFileSync(keyPath, "utf8");
    const privateKey = createPrivateKey(key);

    const jwtHeader: T_JWTHeader = {
        typ: "JWT",
        alg: "RS256",
    };

    const jwtBody: T_JWTBody = {
        iss: "urn:example:issuer",
        aud: "urn:example:audience",
        iat: 1111111,
        exp: 2222222,
    };

    const jwt = await new SignJWT({})
        .setProtectedHeader(jwtHeader)
        .setIssuedAt()
        .setIssuer(jwtBody.iss)
        .setAudience(jwtBody.aud)
        .setExpirationTime("15min")
        .sign(privateKey);

    return formatJSONResponse({
        jwt,
    });
};

export const main = middyfy(generateJwt);
