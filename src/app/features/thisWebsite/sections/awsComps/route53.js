import Link from 'next/link'
import TextSubSection from '@/components/text/subSection'

export default function Route53Summary() {

    return (
        <TextSubSection
            sectionInitiallyVisible={false}
            header="Amazon Route 53"
            testId="route53"
            fragmentForAnchor="route53"
        ><p className="pr-1">I purchased and registered the domain jumpingintocloud.com using Amazon Route 53.  Amazon Route 53 is a Domain Name System (DNS) service provided as part of
            Amazon Web Services.  It tightly integates with many other AWS services such as CloudFront, S3, API Gateway, Elastic Load Balancer etc.  AWS customers can
            perform the following tasks (and more) in Route 53:</p>
            <ul className="list-disc pt-2">
                <li className="ml-6 mr-2">Purchase and register domain names</li>
                <li className="ml-6 mr-2">Create DNS records to route traffic to AWS resources and other IP-based destinations</li>
                <li className="ml-6 mr-2">Create policies that can direct traffic based on latency, geographic location or weighted criteria as well as provide automatic failover to healthy resources</li>
            </ul>
            <p className="pt-2 mr-2">After registering the new domain, a hosted zone was created where I could enter DNS records
                to associate sub-domains to AWS resources.  I created two Alias records in my hosted zone - one of type A (for IPv4) routing and AAAA (for IPv6).
                This allows viewers to connect to a CloudFront Edge location over both protocols
                (<Link
                    className="text-blue-800"
                    href="https://aws.amazon.com/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/">
                    AWS has recently introduced an $0.005 USD/hour charge for all public IPv4
                    addresses starting February 2024.
                </Link>  For future consideration, I would like to leverage IPv6 as much as possible, which incurs no extra charge).</p>
            <p className="pt-2 mr-2">An Alias record in Route 53 allows you to associate sub-domains as well as an apex
                domain (jumpingintocloud.com) to AWS resources such as an API Gateway endpoint, Application Load Balancer, CloudFront distribution
                or one of a few dozen other resources.  Queries against qualifying Alias records also incur no additional charges (non-Alias Standard
                queries cost $0.40 USD per 1 million queries for the first billion).
            </p>
            <p className="pt-2 mr-2">With the Alias records added to the hosted zone of this domain, a user can enter jumpingintocloud.com into their browser
                and will be directed to the CloudFront distribution hosting this website (more in the CloudFront section).</p>
        </TextSubSection>
    )
}