import TextSubSection from '@/components/text/subSection'

export default function ElbSummary() {
    return (
        <TextSubSection
            sectionInitiallyVisible={false}
            header="Elastic Load Balancing">
            <TextSubSection
                testId="elb-intro"
                sectionInitiallyVisible={false}
                sectionType="h2"
                header="Introduction">
                <p className="pr-1">In order to more efficiently and securely expose my app (primarily to Route 53 so I can use an Alias record to route traffic), I created an Amazon Elastic Load Balancing (ELB) application load balancer.
                    Amazon ELB provides three different types of load balancers.</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6"><span className="font-bold">Application Load Balancer (ALB)</span> – operates at Open Systems Interconnection (OSI) model layer 7 (application layer).  Primarily used to balance distribution of HTTP/S requests.
                        This load balancer can listen to requests and route them to target groups or redirect to another URL based on the content of the request (URL, query parameters, headers, body).  Can support targets by EC2 instance ID or IP address.
                        Can also distribute requests by round-robin or by “least outstanding requests” where the target with the smallest current load receives the request.</li>
                    <li className="ml-6"><span className="font-bold">Network Load Balancer (NLB)</span> – operates at OSI model layer 4 (transport layer).  Primarily used to balance distribution of TCP and UDP requests.  This load balancer can handle millions of requests per second
                        and also uses static IPs, allowing you to map Elastic IP addresses to them.  NLBs natively preserve the source IP address of TCP/UDP packets (this must be configured via additional HTTP header for ALB).  NLBs distribute requests to
                        targets with a flow hash algorithm based on Protocol, source IP, source port, destination IP, destination port and TCP sequence number (the latter not applicable to UDP requests).</li>
                    <li className="ml-6"><span className="font-bold">Gateway Load Balancer (GLB)</span> – operates at OSI model layer 3 (network layer).  It listens for IP packets across all ports and forwards them to configured target groups.  GLBs can distribute IP traffic across a
                        group of virtual appliances such as firewalls, intrusion detection systems (IDS) and intrusion protection systems (IPS).</li>
                </ul>
                <p className="pt-2">For this application, we will use an application load balancer (ALB).  We will first create a target group to which our load balancer will route requests.</p>
                <p className="pt-2">NOTE:  In a production environment I would likely have my ECS cluster manage creation of my ALB and registration of targets (EC2 container instances or Fargate tasks).</p>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="elb-target-groups"
                header="Target Groups">
                <p className="pr-1">A target group is a collection of resource or IP addresses to which an ELB load balancer can distribute requests.  The following can be registered as targets to a target group:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6">EC2 instances (by instance ID)</li>
                    <li className="ml-6">IP addresses</li>
                    <li className="ml-6">AWS Lambda function (ALB only)</li>
                    <li className="ml-6">Another Application Load Balancer (useful for routing requests to an internet-facing NLB within a VPC as well as indirectly associating an Elastic IP address with an ALB.)</li>
                </ul>
                <p className="pt-2">For our application, we will select instances as 1.  We are running the EC2 launch type in ECS and 2.  We are using the ‘host’ network mode.  Should we use Fargate in the future, we would select IP addresses as the target type.</p>
                <p className="pt-2">We now need to select the protocol and port for our target group.  Since we need to expose our application frontend, which is a NextJS app that runs on port 3000, to the ALB we will specify port 3000 as the port while keeping the HTTP protocol. 
                 We will keep the remaining defaults up until the health check configuration.</p>
                <p className="pt-2">In my NextJS application I developed a route JS file to return the following JSON from the following endpoint:</p>
                <ul className="list-disc pt-2">
                    <li className="ml-6">Endpoint:  http://&lt;myapphost&gt;:3000/health</li>
                    <li className="ml-6">Response:  &#123; &quot;healthy&quot;: true &#125;</li>
                </ul>
                <p className="pt-2">This allows the ALB to confirm that the target is healthy and that it can continue directing requests to it.  I keep HTTP as the health check protocol and specify the endpoint as /health.</p>
                <p className="pt-2">The last part was to register targets.  I selected my EC2 instance registered to my ECS cluster and specified port 3000 as the target port as that port hosts the NextJS frontend.  </p>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                testId="elb-create"
                header="Creating the Application Load Balancer">
                <p className="pr-1">With my target group created, it was time to create my application load balancer.  I specified the desired VPC and all 3 availability zones in the eu-central-1 region.  I also specified a security group that allowed inbound traffic from the internet 
                (0.0.0.0/0) on ports 80 (HTTP) and 443 (HTTPS).  For listeners, I added one for each port:  80, and 443.  For the default target group, I specified the group I created in the previous step.</p>
                <p className="pt-2">After creation of the ALB, in order to configure re-direction of HTTP requests to HTTPS, I had to edit my recently created ALB to adjust the HTTP port 80 rule.  I modified the rule to redirect to the HTTPS listener on port 443 while maintaining the host, 
                path and query values (&#123;protocol&#125;://&#123;host&#125;:443/&#123;path&#125;?&#123;query&#125;).</p>
            </TextSubSection>
            <TextSubSection
                sectionInitiallyVisible={false}
                sectionType="h2"
                header="Secure Listener Settings">
                    <p className="pr-1">With an HTTP listener on my ALB, I needed to configure an SSL/TLS certificate.  I had created this certificate as I set up SSL/TLS for this website and used the same (my public certificate from ACM but this time the one in the eu-central-1 region).  </p>
                    <p className="pt-2">At this point, my load balancer was able to accept requests and route them to my ECS cluster.</p>
            </TextSubSection>
        </TextSubSection>
    )
}