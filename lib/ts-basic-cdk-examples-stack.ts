import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy,
  RemovalPolicy
} from 'aws-cdk-lib'

export class TsBasicCdkExamplesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create s3 bucket
    const bucket = new s3.Bucket(this, 's3DeployPOCBucket', {
      bucketName: 's3-deploy-hosting-bucket',
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      removalPolicy: RemovalPolicy.DESTROY
    })


    // upload static website
    new s3Deploy.BucketDeployment(this, 's3DeployPOCDeploy', {
      sources: [s3Deploy.Source.asset('./web/dist')],
      destinationBucket: bucket
    })
  }
}
