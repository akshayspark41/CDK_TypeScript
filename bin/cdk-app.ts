#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { Ec2Stack } from '../lib/ec2-stack';
import { AlbStack } from '../lib/alb-stack';
import { RdsStack } from '../lib/rds-stack';
import { Tags } from 'aws-cdk-lib';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'Sparkworks-HA-Dev-VpcStack');
Tags.of(vpcStack).add('Project', 'Sparkworks-HA');
Tags.of(vpcStack).add('Environment', 'Dev');

const ec2Stack = new Ec2Stack(app, 'Sparkworks-HA-Dev-Ec2Stack', {
  vpc: vpcStack.vpc,
});
Tags.of(ec2Stack).add('Project', 'Sparkworks-HA');
Tags.of(ec2Stack).add('Environment', 'Dev');

const albStack = new AlbStack(app, 'Sparkworks-HA-Dev-AlbStack', {
  vpc: vpcStack.vpc,
  ec2Instances: ec2Stack.ec2Instances,
});
Tags.of(albStack).add('Project', 'Sparkworks-HA');
Tags.of(albStack).add('Environment', 'Dev');

const rdsStack = new RdsStack(app, 'Sparkworks-HA-Dev-RdsStack', {
  vpc: vpcStack.vpc,
});
Tags.of(rdsStack).add('Project', 'Sparkworks-HA');
Tags.of(rdsStack).add('Environment', 'Dev');