import { Stack, StackProps, aws_apigateway as apigateway, CfnOutput } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class BasicApiGatewayExampleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps){
        super(scope, id, props)

        // Create an PI Gateway REST API
        const api = new apigateway.RestApi(this, 'BasicApiGatewayExample', {
            restApiName: 'Basic Rest API'
        })

        // Define a new resource (endpoint)
        const users = api.root.addResource('users')

        // Define a GET method on the resource
        users.addMethod('GET', new apigateway.MockIntegration(), {
            methodResponses: [{ statusCode: '200' }]
        })

        // Output the API endpoint URL
        new CfnOutput(this, 'ApiEndpoint', {
            value: api.url
        })
    }
}