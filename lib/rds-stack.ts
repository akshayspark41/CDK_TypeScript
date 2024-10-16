import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface RdsStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class RdsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RdsStackProps) {
    super(scope, id, props);

    // Create RDS instance
    new rds.DatabaseInstance(this, 'MyRdsInstance', {
      vpc: props.vpc,
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_32,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, 
      },
      multiAz: true, 
      allocatedStorage: 20, 
      databaseName: 'MyDatabase', 
      credentials: rds.Credentials.fromGeneratedSecret('admin'), 
      removalPolicy: cdk.RemovalPolicy.DESTROY, 
    });
  }
}
