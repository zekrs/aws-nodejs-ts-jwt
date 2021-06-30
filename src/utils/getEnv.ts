export const getEnv = (): string => {
    if (process.env.IS_OFFLINE === "true") return "local";
    return process.env.CURRENT_ENV;
};
