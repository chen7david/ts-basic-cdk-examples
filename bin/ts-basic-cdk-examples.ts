#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BasicApiGatewayExampleStack } from '../lib/basic-apigw-example-stack';

const app = new cdk.App();
new BasicApiGatewayExampleStack(app, 'TsBasicCdkExamplesStack', {});