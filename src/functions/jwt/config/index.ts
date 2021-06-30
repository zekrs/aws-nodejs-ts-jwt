import { T_ConfigProps, T_AppConfigProps } from "./types";
import { getEnv } from "@utils/getEnv";

const local: T_ConfigProps = {
    keyFileName: "some_private_and_valid_key.pem",
    redirectUrl: "some_redirect_url",
};

const dev: T_ConfigProps = {
    keyFileName: "some_private_and_valid_key.pem",
    redirectUrl: "some_redirect_url",
};

const prod: T_ConfigProps = {
    keyFileName: "some_private_and_valid_key.pem",
    redirectUrl: "some_redirect_url",
};

const conf: T_AppConfigProps = {
    local,
    dev,
    prod,
};

const env: string = getEnv();

export const config = conf[env];
