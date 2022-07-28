import {
  App, Stack, StackProps,
  aws_eks as eks,
  aws_ec2 as ec2,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { isDefault: true });

    new eks.FargateCluster(this, 'Cluster', {
      vpc,
      version: eks.KubernetesVersion.V1_21,
    });

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'cdk-eks-cluster-dev', { env: devEnv });
// new MyStack(app, 'cdk-eks-cluster-prod', { env: prodEnv });

app.synth();