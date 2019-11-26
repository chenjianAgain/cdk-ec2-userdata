import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class MyEc2AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // sudo yum update -y

    const shellCommandsMaster = ec2.UserData.forLinux();
    shellCommandsMaster.addCommands("yum update -y");
    shellCommandsMaster.addCommands("hostnamectl set-hostname master");
    shellCommandsMaster.addCommands("yum install -y httpd");
    shellCommandsMaster.addCommands("echo test > /var/www/html/index.html");
    shellCommandsMaster.addCommands("systemctl start httpd");
    //shellCommandsMaster.addCommands("echo test > /var/www/html/index.html");

    
    const shellCommandsNode1 = ec2.UserData.forLinux();
    shellCommandsNode1.addCommands("sudo yum update -y");
    shellCommandsNode1.addCommands("sudo hostnamectl set-hostname node1");
    
    const shellCommandsNode2 = ec2.UserData.forLinux();
    shellCommandsNode2.addCommands("sudo yum update -y");
    shellCommandsNode2.addCommands("sudo hostnamectl set-hostname node2");
    
//     // Using default vpc
//     const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
//       isDefault: true
//     });
    
    const vpc = new ec2.Vpc(this, 'VPC');

    // Open port 22 for SSH connection from anywhere
    const mySecurityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      securityGroupName: "my-test-sg",
      description: 'Allow ssh access to ec2 instances from anywhere',
      allowAllOutbound: true 
    });
    mySecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), 'allow public ssh access')
    

    // We are using the latest AMAZON LINUX AMI
    const awsAMI = new ec2.AmazonLinuxImage({generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2});
    // const linuxAMI = new ec2.GenericLinuxImage()

    const instanceNameMaster = "master-instance"
    // We define master-instance details here
    const masterEc2Instance = new ec2.CfnInstance(this, instanceNameMaster, {
      imageId: awsAMI.getImage(this).imageId,
      keyName: 'devops',
      instanceType: "t2.micro",
      monitoring: false,
      tags: [
        {"key": "Name", "value": instanceNameMaster}
      ],
      networkInterfaces: [
        {
          deviceIndex: "0",
          associatePublicIpAddress: true,
          subnetId: vpc.publicSubnets[0].subnetId,
          groupSet: [mySecurityGroup.securityGroupId]
        }
      ],
      userData: cdk.Fn.base64(shellCommandsMaster.render())

    })

    // We define node1-instance details here
    const instanceNameNode1 = "node1-instance"
    const node1Ec2Instance = new ec2.CfnInstance(this, instanceNameNode1, {
      imageId: awsAMI.getImage(this).imageId,
      keyName: 'devops2',
      instanceType: "t2.micro",
      monitoring: false,
      tags: [
        {"key": "Name", "value": instanceNameNode1}
      ],
      networkInterfaces: [
        {
          deviceIndex: "0",
          associatePublicIpAddress: true,
          subnetId: vpc.publicSubnets[0].subnetId,
          groupSet: [mySecurityGroup.securityGroupId]
        }
      ],
      userData: cdk.Fn.base64(shellCommandsNode1.render())
    })


    // We define node2-instance details here
    const instanceNameNode2 = "node2-instance"
    const node2Ec2Instance = new ec2.CfnInstance(this, instanceNameNode2, {
      imageId: awsAMI.getImage(this).imageId,
      keyName: 'devops2',
      instanceType: "t2.micro",
      monitoring: false,
      tags: [
        {"key": "Name", "value": instanceNameNode2}
      ],
      networkInterfaces: [
        {
          deviceIndex: "0",
          associatePublicIpAddress: true,
          subnetId: vpc.publicSubnets[0].subnetId,
          groupSet: [mySecurityGroup.securityGroupId],
    
        }
      ],
      userData: cdk.Fn.base64(shellCommandsNode2.render())
    })


  }
}
