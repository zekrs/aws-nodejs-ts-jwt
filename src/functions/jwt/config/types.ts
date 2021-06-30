export type T_ConfigProps = {
    keyFileName: string;
    redirectUrl?: string;
};

export type T_AppConfigProps = {
    local: T_ConfigProps;
    dev: T_ConfigProps;
    prod: T_ConfigProps;
};
