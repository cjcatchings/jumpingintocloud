import TextSubSection from '@/components/text/subSection'

export default function EcsSummary() {
    return (
        <TextSubSection
            sectionInitiallyVisible={false}
            largeSection={true}
            testId="ecs"
            header="Elastic Container Service">
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="ecs-intro"
                header="Introduction">
                <p className="pr-1">With my images pushed and available in ECR, I can now use Amazon Elastic Container Service to deploy them as
                    services running as Docker containers on EC2 instances.  Amazon Elastic Container Service (ECS) is a container orchestration service
                    provided by AWS that can run containers built as images with the Docker container runtime.  These containers run on AWS infrastructure
                    on two different launch types:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6"><span className="font-bold">EC2</span> – this allows you to configure and provision your own EC2 instances that will run your containers.
                        It provides a large degree of control in terms of instance types, networking and auto-scaling groups.  However, with this degree of
                        control and flexibility comes additional maintenance overhead.  I am using this instance type for this project since I can configure
                        t2.micro instances (which are in the AWS free tier) to run my containers.</li>
                    <li className="ml-6"><span className="font-bold">Fargate</span> - this option reduces the management over head by requiring you to simply configure the number of vCPUs, memory and operating system for your container instances.
                        AWS handles the infrastructure behind the scenes.  In a small production or proof-of-concept scenario where cost is less of an issue, I would use this launch type. </li>
                </ul>
                <p className="pt-2">ECS comes with its own vocabulary for its building blocks, though most in the IT field will be familiar with the terms:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6"><span className="font-bold">Cluster</span> – The root building block of ECS.  This will define the tasks and services running your containers as well as define the infrastructure running them (capacity providers and container instances)
                    </li>
                    <li className="ml-6"><span className="font-bold">Task Definition</span> – A specified configuration for how your application is deployed on ECS.  It defines the images (ECR or DockerHub) for the containers that run your application, how much vCPU/memory is configured for your
                        application as well as each container, the networking and storage configuration for your containers (including security groups and subnets if you use the <pre className="inline bg-slate-300 w-9/12 text-wrap mt-1"><code className="text-xs">awsvpc</code></pre> network mode) and which ports to expose.
                    </li>
                    <li className="ml-6"><span className="font-bold">Task</span> – A container or set of containers launched from a task definition that typically execute once, stop on their own and are not replaced automatically.  These are best for one-off or batch jobs that run on a schedule.
                    </li>
                    <li className="ml-6"><span className="font-bold">Service</span> – One or more tasks that run indefinitely and are replaced automatically when it becomes ‘unhealthy’.  An ECS service will ensure that a configured number of tasks are running at any given time and will replace failed tasks.  These are typically used for long-running processes such as web applications that need to be available to serve requests.
                    </li>
                </ul>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                testId="ecs-iam"
                sectionType="h2"
                header="Identity and Access Managerment (IAM)">
                <p className="pr-1">In order to run ECS tasks on EC2 instances, two types of IAM roles are required and one is optional:  </p>
                <ul className="list-disc pt-2">
                    <li className="ml-6"><span className="font-bold">Instance Role:</span>  This role will be attached to the EC2 instance (as part of the instance profile) running the task containers and needs access to resources and services critical to operating ECS such as
                        pulling ECR images, writing logs to CloudWatch etc.  This role also needs a trust relationship policy that allows the ECS service (ecs.amazonaws.com) to assume the role.</li>
                    <li className="ml-6"><span className="font-bold">Task Execution Role:</span>  This role will be assumed by the container agent running on the EC2 instance and will make calls to AWS services on your behalf in order to manage the containers on the instance.  </li>
                    <li className="ml-6"><span className="font-bold">Task IAM Role (optional):</span>  This role can be assigned to your containers to access any external AWS services (S3, DynamoDB etc.) required to fulfill task execution.   </li>
                </ul>
                <p className="pt-2">For the instance role, I attached the following AWS-managed policies:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6">AmazonEC2ContainerServiceForEC2Role (not needed if you’re using the Fargate launch type)</li>
                    <li className="ml-6">AmazonEC2ContainerServiceRole</li>
                </ul>
                <p className="pt-2">I also added the following trust relationship policy:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
                    {`{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "ecs.amazonaws.com",
                    "ec2.amazonaws.com"
                ]
            },
            "Action": "sts:AssumeRole"
        }
    ]
}`}
                </code></pre>
                <p className="pt-2">For the task execution role, AWS recommends the following permissions policy:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
                    {`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}`}
                </code></pre>
                <p className="pt-2">This role also needs the following trust relationship policy so that the ECS tasks service can assume it on your behalf:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
                    {`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`}
                </code></pre>
                <p className="pt-2">At the moment, this application does not require a task IAM role.  However, if your ECS task needs access to AWS resources, 
                a necessary permissions policy should be defined in your task IAM role.  You should also include the following trust relationship policy:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Effect":"Allow",
         "Principal":{
            "Service":[
               "ecs-tasks.amazonaws.com"
            ]
         },
         "Action":"sts:AssumeRole",
         "Condition":{
            "ArnLike":{
            "aws:SourceArn":"arn:aws:ecs:<aws-region>:<aws-acct-id>:*"
            },
            "StringEquals":{
               "aws:SourceAccount":"<aws-acct-id>"
            }
         }
      }
   ]
}`}                    
                </code></pre>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="ecs-launch-template"
                header="Launch Template">
                <p className="pr-1">In order for ECS on EC2 to handle scaling of instances for ECS services running in a cluster, an auto scaling group which creates EC2 instances based on a launch template is required.  For the launch template, 
                I searched for an ECS-optimized AMI in the eu-central-1 region.  The ECS-optimized AMI contains the ECS container agent, facilitating assignment of EC2 instances to your ECS cluster.  AMI ami-0ddf41c518efaafce is ECS-optimized, and 
                runs the Amazon Linux 2023 operating system so I used that as the AMI for my launch template.</p>
                <p className="pt-2">I created a key-pair (so I could troubleshoot issues by connecting via SSH to the instance.  In a production scenario I would use AWS Systems Manager Session Manager to connect to EC2 instances without opening port 22 for SSH). </p>
                <p className="pt-2">I specified the t2.micro instance type for my launch template and provided the desired subnets (the public subnets for each availability zone in VPC – eu-central-1a, eu-central-1b, eu-central-1c) in which to create my EC2 instances and 
                the security groups to assign them to.  I opened the following ports for my EC2 instances via security groups:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6">Port 3000 to my VPC CIDR block (172.31.0.0/16) so that an ELB application load balancer can access my frontend (a NextJS app running on port 3000)</li>
                    <li className="ml-6">Port 5000 to my 3 private subnets so that my NextJS frontend app can access my application layer (a Python Flask app running on port 5000)</li>
                    <ul className="list-disc pt-2">
                        <li className="ml-6">172.31.0.0/20</li>
                        <li className="ml-6">172.31.16.0/20</li>
                        <li className="ml-6">172.31.32.0/20</li>
                    </ul>
                    <li className="ml-6">Port 22 to my local IP address for troubleshooting purposes.  In a true production environment this would not be desired.</li>
                </ul>
                <p className="pt-2">I operate this application out of public subnets since my application requires access to MongoDB Atlas.  In a true production environment, I would likely do the following:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6">Establish a VPC peering relationship with my MongoDB Atlas cluster (running on an M10 cluster type) and update the necessary route tables to route to this cluster OR migrate the database to Amazon DynamoDB and use a VPC 
                    endpoint to access the database inside the AWS network (no public internet exposure).</li>
                    <li className="ml-6">Specify my private subnets for the EC2 container instances in my launch template.</li>
                    <li className="ml-6">Use  an instance type larger than t2.micro (or use the Fargate launch type).</li>
                </ul>
                <p className="pt-2">Lastly, I set the container instance role to that defined above and provided a user data script that will inform ECS to assign the EC2 instance to my ECS cluster:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`#!/bin/bash
echo "ECS_CLUSTER=MyECSClusterName" >> /etc/ecs/ecs.config`}                    
                </code></pre>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                testId="ecs-boto3"
                sectionType="h2"
                header="Python Boto3 SDK">
                <p className="pr-1">AWS provides a Python-based SDK named Boto3 that allows you to create, configure and manage AWS services via Python code.  Eventually I would like to migrate this code to a CloudFormation template or a Cloud Development Kit (CDK) script.</p>
                <p className="pt-2">In order to execute Python code that can provision resources in my AWS account, I had to establish a profile in AWS Identity Center.  Details for that setup will be provided in the future (as a separate link).  However, at a high level, 
                I created an organization in AWS Organizations as well as a development account in the organization.  I created a user in the development account as well as permissions sets that contain a set of necessary IAM roles containing policies needed to execute
                 API commands as this year (from Python code). </p>
                <p className="pt-2">Once this was created, an Identity Center URL was provided to log in as a user with a certain role attached.  I created this profile in my ~/.aws/config file so that my PyCharm environment could detect this profile.  The profile definition had the following:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`[profile myDevProfile]
sso_start_url = https://<my-unique-idc-url-id>.awsapps.com/start
sso_region = us-east-1
sso_account_id = <account-id-of-dev-acct>
sso_role_name = <myDevRoleName>
region = eu-central-1
output = json`}    
                </code></pre>
                <p className="pt-2">From a command line, I ran the following command to begin the authentication process from my AWS Identity Center profile:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`>>> aws sso login –proflie myDevProfile`}    
                </code></pre>
                <p className="pt-2">This opened a browser with the above sso_start_url where I could log in as my developer user.  Once logged in, I could return to PyCharm and execute Python commands as this Identity Center user.</p>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="ecs-create-cluster"
                header="Create ECS Cluster">
                <p className="pr-1">The next step was to create the ECS cluster.  In PyCharm I first established a Boto3 session using the following commands to connect to the ECS service and create a cluster:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`import boto3

dev_session = boto3.Session(profile_name=’myDevProfile’)
ecs_client = dev_session.client(‘ecs’)
new_ecs_cluster = ecs_client.create_cluster(
	clusterName=’FantasyFootballCluster’
)`}    
                </code></pre>
                <p className="pt-2">This created the cluster without having to create an auto scaling group.  As mentioned previously, in a production environment, I would include an auto scaling group to ensure the number of resources required to scale my application were available.</p>
           </TextSubSection>
           <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="ecs-cloudwatch-logs"
                header="CloudWatch Logs and Log Groups">
                <p className="pr-1">Amazon CloudWatch Logs is a feature of Amazon CloudWatch that can store and monitor log files generated from AWS resources and services such as EC2 instances, CloudTrail, Route 53 and more.  Log Groups can be created in CloudWatch Logs to partition logs based 
                on criteria of your choosing (in my case, separate logs for my application logic and frontend).  These logs can stored in S3 indefinitely or for a specified period of time.  </p>
                <p className="pt-2">I created two log groups:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6">/ecs/CJCFantasyFootballMW – Stores the Flask logs for my application layer</li>
                    <li className="ml-6">/ecs/CJCFantasyFootballFE – Stores the NextJS logs for my frontend layer</li>
                </ul>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="ecs-register-task-def"
                header="Register ECS Task Definition">
                <p className="pr-1">In order to start creating ECS tasks and services, I needed a task definition.  I had most of the other pieces in place (my images in an ECR repository, an ECS cluster created and an EC2 container instance assigned to the cluster). 
                 I ran the following command in python to register my task definition:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`task_def = ecs_client.register_task_definition(
    family='CJCFantasyFootball',
    taskRoleArn='arn:aws:iam::<my_aws_acct_id>:role/<my_task_iam_role_name>,
    executionRoleArn='arn:aws:iam::<my_aws_acct_id>:role/<my_task_execution_role_name>,
    networkMode='host',
    containerDefinitions=[
        {
            'name': 'FantasyFootballMW',
            'image': 'public.ecr.aws/n0u5h2y6/cjc-fantasy-football-mw:latest',
            'cpu': 256,
            'memory': 256,
            'portMappings':[{
                'containerPort': 5000,
                'hostPort': 5000,
                'protocol': 'tcp',
                'appProtocol': 'http'
            }],
            'essential': True,
            'environment':[
                {'name': 'FF_PYENV', 'value': 'DEV_CLOUD'},
                {'name': 'MongoEnv', 'value': 'atlas'},
                {'name': 'MongoHost', 'value': '<my_mongodb_atlas_cluster>’},
                {'name': 'MongoPort', 'value': ''},
                {'name': 'MongoUsername', 'value': '<my_mongodb_atlas_username>'},
                {'name': 'MongoPassword', 'value': '<my_mongodb_atlas_password>'},
                {'name': 'AuthSecret', 'value': '<my_auth_secret_to_hash_passwords>'},
                {'name': 'JwtSecret', 'value': '<my_jwt_secret_to_encode_decode_tokens>'},
                {'name': 'UseEnvVars', 'value':'True'}
            ],
            'logConfiguration': {
                'logDriver': 'awslogs',
                'options':{
                    'awslogs-region': 'eu-central-1',
                    'awslogs-group': '/ecs/CJCFantasyFootballMW'
                }
            }
        },{
            'name': 'FantasyFootballFE',
            'image': 'public.ecr.aws/n0u5h2y6/cjc-fantasy-football-fe:latest',
            'cpu': 256,
            'memory': 512,
            'portMappings': [{
                'containerPort': 3000,
                'hostPort': 3000,
                'protocol': 'tcp',
                'appProtocol': 'http'
            }],
            'essential': True,
            'logConfiguration': {
                'logDriver': 'awslogs',
                'options':{
                    'awslogs-region': 'eu-central-1',
                    'awslogs-group': '/ecs/CJCFantasyFootballFE'
                }
            }
        }
    ],
    cpu='1 vCPU',
    memory='0.75 GB',
    runtimePlatform={
        'cpuArchitecture': 'X86_64',
        'operatingSystemFamily': 'LINUX'
    },
    requiresCompatibilities=['EC2']
)`}                    
                </code></pre>
                <p className="pt-2">A few notes on how I configured this task definition:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6">I used the `host` network mode as my containers run in public subnets in order to access MongoDB Atlas while remaining in free tier.  In a production environment, I would likely 
                    use the `awsvpc` network mode as that would assign private IP addresses to my containers to facilitate cross-container connectivity.  It is also worth mentioning that `awsvpc` is the only network mode available for the Fargate launch type.</li>
                    <li className="ml-6">I specified environment variables required to connect to my MongoDB Atlas database, encode/decode JWT tokens and generate password hashes in the task definition itself.  
                This is not the most secure approach.  However, as this is a development/sandbox application, it met my needs for the time being.  In a production environment I would retrieve these values either from AWS Secrets Manager or Systems Manager Parameter Store.  
                AWS charges for both those services so to minimize costs for the time being, I kept the values statically defined in my task definition.</li>
                </ul>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="ecs-create-service"
                header="Create ECS Service">
                <p className="pr-1">The last step to run my application on ECS was to create a service.  I used the following Boto3 Python command to create my service:</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`service_resp = ecs_client.create_service(
    cluster='FantasyFootballCluster',
    serviceName='FantasyFootballService',
    taskDefinition='CJCFantasyFootball:1',
    desiredCount=1,
    launchType='EC2',
    schedulingStrategy='REPLICA'
)`}
                </code></pre>
                <p className="pt-2">Had my task definition used the ‘awsvpc’ network mode, I would provide subnets and security groups for my service.  In a production environment, these would be my private subnets and security groups restricting port access only to those
                 necessary (port 3000 to my public subnets where an application load balancer may run, port 5000 to my private subnets for NextJS -&gt; Flask access).</p>
            </TextSubSection>
        </TextSubSection>
    )
}