#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkPostStack } from '../lib/my-ec2-app-stack';
import { MyEc2AppStack } from '../lib/MyEc2AppStack';


const env = {
    region: 'us-east-1',
    account: '374801192098'
};
const app = new cdk.App();
new CdkPostStack(app, 'CdkPostStack', { env });
new MyEc2AppStack(app, 'MyEc2AppStack', { env });
