import Image from 'next/image'
import Link from 'next/link'
import TextSubSection from '@/components/text/subSection'

export default function FFAwsCompIntro({children}){

    return (
        <>
            <p className="text-2xl pt-2 text-center">Fantasy Football Application</p>
            <p className="text-center">Status:
                <Image
                    className="inline ml-2 mr-1"
                    src="/gray-light.png"
                    alt="Available"
                    height={16}
                    width={16} />Not Available
            </p>
            <p className="pt-4 text-lg px-2">I have been building a fantasy football web application on-and-off for the past few months using conventional
             frameworks and resources such as MongoDB for the data layer, Python/Flask for the application layer and React/NextJS for the front-end.  Once I 
             passed the AWS Certified Solutions Architect Professional exam, I decided to start trying to move this application to cloud services.  I wanted to 
             try to stick with free/free-tier resources for the time being as this is just a personal project for me.  These resources included the following:</p>
             <ul className="list-disc pt-2">
                <li className="ml-6 mr-2">Amazon EC2 t2.micro instances (750 free hours/month)</li>
                <li className="ml-6 mr-2">Amazon ECS (always free, only charged for consumed resources)</li>
                <li className="ml-6 mr-2">Amazon ECR (500MB free private repository storage, 5TB free for public)</li>
                <li className="ml-6 mr-2">MongoDB Atlas (free for shared m0 instances with up to 5GB of storage)</li>
             </ul>
             <p className="pt-4 text-lg px-2">The architecture in the cloud looks as follows:</p>
            <p className="pt-4 self-center"><Image
                src="/arch_diagrams/FantasyFootball.png"
                alt=""
                width={800}
                height={200} /></p>
            <p className="pt-4 text-lg px-2">I want to share a few notes/caveats here that may be detailed in sections below.</p>
            <ul className="list-disc pt-2">
                <li className="ml-6 mr-2">Using Fargate with ECS for the compute portion of this archtecture will be lower maintenance.  However, t2.micro instances cannot be 
                used with Fargate as the the minimum memory requirement for 1 vCPU in Fargate is 2GB, and t2.micro (which is the only available instance type in the eu-central-1 
                region for free-tier) is 1 vCPU/1GB memory.</li>
                <li className="ml-6 mr-2">All AWS resources (except the Atlas database on the MongoDB side) are hosted on public subnets, including the ECS container instances.  In an 
                optimal cloud infrastructure, the application layer would be provisioned in a private subnet and use a NAT Gateway to communicate with the Atlas database (or possibly, 
                VPC peering with the VPC of the Atlas database would be used).  However, at $0.052 USD/hour in the eu-central-1 region, NAT Gateways can be expensive for personal projects.  
                Also, VPC peering with MongoDB Atlas is supported for M10 instances and above, which start at $0.08 USD/hr.  Considering that, for the time being, I am running this app on an 
                ad-hoc basis for demo purposes, I want to keep my costs minimal.  Furthermore, as this app does not contain any sensitive data (the sample users are not real people, except for 
                myself), there are no data security concerns at the moment.  
                In the future I may consider shifting to a more enterprise-friendly infrastructure.
                    <ul className="list-disc pt-2 text-sm">
                        <li className="ml-10"><Link className="text-blue-600" href="https://fck-nat.dev/stable/">fck-nat</Link> is an less expensive alternative to NAT Gateways.  It operates as an Amazon Machine Image (AMI) that 
                        you can run on an EC2 instance in a public subnet and use as an egress proxy to the internet for your private subnet resources.</li>
                    </ul>
                </li>
            </ul>
            <TextSubSection
                className="pt-4 px-4"
                sectionType="h1"
                sectionInitiallyVisible={false}
                header="AWS Components/Services">
                    {children}
            </TextSubSection>
        </>
    )
}