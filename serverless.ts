import type { AWS } from "@serverless/typescript";

import jwt from "@functions/jwt";

const serverlessConfiguration: AWS = {
    service: "aws-nodejs-ts-jwt",
    frameworkVersion: "2",
    custom: {
        webpack: {
            webpackConfig: "./webpack.config.js",
            includeModules: true,
        },
        "serverless-offline": {
            location: ".webpack/service",
            httpPort: 3004,
            useChildProcesses: true,
        },
    },
    plugins: ["serverless-webpack", "serverless-offline"],
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        region: "eu-central-1",
        stage: "${opt:stage, '${file(.sls.config.yml):default_env}'}",
        profile: "${file(.sls.config.yml):environment.${self:provider.stage}.profile}",
        deploymentBucket: {
            name: "${file(.sls.config.yml):environment.${self:provider.stage}.account_id}-eu-central-1-serverless-deployment-bucket",
            blockPublicAccess: true,
            serverSideEncryption: "AES256",
        },
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
            apiKeys: [
                {
                    name: "${self:provider.stage}-create-jwt",
                    value: "${file(.sls.config.yml):environment.${self:provider.stage}.api_key}",
                },
            ],
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            CURRENT_ENV: "${self:provider.stage}",
        },
        lambdaHashingVersion: "20201221",
    },
    variablesResolutionMode: "20210326",
    // import the function via paths
    functions: { jwt },
};

module.exports = serverlessConfiguration;
