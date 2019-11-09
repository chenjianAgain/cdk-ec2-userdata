#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { MyEc2AppStack } from '../lib/my-ec2-app-stack';

const app = new cdk.App();
new MyEc2AppStack(app, 'MyEc2AppStack');
