#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkPostStack } from '../lib/my-ec2-app-stack';
import { MyEc2AppStack } from '../lib/MyEc2AppStack';
import { MyEc2AppStack1 } from '../lib/MyEc2AppStack.1';


const env = {
    region: 'us-west-2',
    account: '374801192098'
};
const app = new cdk.App();
new CdkPostStack(app, 'CdkPostStack', { env });
new MyEc2AppStack(app, 'MyEc2AppStack', { env });
new MyEc2AppStack1(app, 'MyEc2AppStack1', { env });
