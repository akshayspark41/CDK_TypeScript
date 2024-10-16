import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface Ec2StackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class Ec2Stack extends cdk.Stack {
  public readonly ec2Instances: ec2.Instance[];

  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    // Create EC2 instances
    this.ec2Instances = [
      new ec2.Instance(this, 'Instance1', {
        vpc: props.vpc,
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
        machineImage: new ec2.AmazonLinuxImage(),
      }),
      new ec2.Instance(this, 'Instance2', {
        vpc: props.vpc,
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
        machineImage: new ec2.AmazonLinuxImage(),
      }),
    ];
  }
}
