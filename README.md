# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template



* aws cloudformation create-stack     \
    --stack-name devops     \
    --template-body file:///Users/cj/my-ec2-app/bin/ubuntu-2.tem     \
    --region us-west-2
