import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy
} from 'aws-cdk-lib'

export class TsBasicCdkExamplesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create s3 bucket
    const bucket = new s3.Bucket(this, 'CDKStaticHostingBucket', {
      bucketName: 'cdk-static-hosting-bucket',
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    })


    // upload static website
    new s3Deploy.BucketDeployment(this, 'StaticHostingDeploy', {
      sources: [s3Deploy.Source.asset('./dist')],
      destinationBucket: bucket
    })
  }
}
