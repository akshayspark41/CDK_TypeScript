import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as elbv2_targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets'; // Import targets
import { Construct } from 'constructs';

interface AlbStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  ec2Instances: ec2.Instance[];
}

export class AlbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AlbStackProps) {
    super(scope, id, props);

    // Create the ALB
    const lb = new elbv2.ApplicationLoadBalancer(this, 'MyALB', {
      vpc: props.vpc,
      internetFacing: true,
    });

    const listener = lb.addListener('Listener', {
      port: 80,
      open: true,
    });

    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'MyTargetGroup', {
      vpc: props.vpc,
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targetType: elbv2.TargetType.INSTANCE,
    });

    // Add EC2 instances to the target group
    props.ec2Instances.forEach(instance => {
      targetGroup.addTarget(new elbv2_targets.InstanceTarget(instance));
    });

    listener.addTargetGroups('TargetGroupAttachment', {
      targetGroups: [targetGroup],
    });

    // Output the ALB DNS name
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: lb.loadBalancerDnsName,
    });
  }
}
