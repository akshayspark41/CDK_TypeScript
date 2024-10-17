#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { Ec2Stack } from '../lib/ec2-stack';
import { AlbStack } from '../lib/alb-stack';
import { RdsStack } from '../lib/rds-stack';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack');

const ec2Stack = new Ec2Stack(app, 'Ec2Stack', {
  vpc: vpcStack.vpc,
});

new AlbStack(app, 'AlbStack', {
  vpc: vpcStack.vpc,
  ec2Instances: ec2Stack.ec2Instances,
});

new RdsStack(app, 'RdsStack', {
  vpc: vpcStack.vpc,
});