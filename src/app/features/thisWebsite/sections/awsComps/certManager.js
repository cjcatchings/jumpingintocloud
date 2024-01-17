import Link from 'next/link'
import TextSubSection from '@/components/text/subSection'

export default function CertManagerSummary() {

    return (
        <TextSubSection
            sectionInitiallyVisible={false}
            testId="acm"
            header="Amazon Certificate Manager (ACM)">
            <p className="pr-1">In order to provide SSL/TLS so that my domain can encrypt data in-transit, I created a public TLS certificate using Amazon Certificate
                Manager (ACM).  ACM can provision, manage and deploy SSL/TLS certificate that integrate with AWS services such as CloudFront, API Gateway, Elastic Load Balancer
                etc. as well as resource connected to your Amazon Virtual Private Cloud (VPC).  Public certificates can be provisioned at no cost (private certificates must be requested
                from a private Certificate Authority, or CA and incur charges based on the duration of the certificate).
            </p>
            <p className="pt-2 mr-2">Since my domain is hosted on the public internet, I provisioned two public certificates:  one in the Frankfurt region (eu-central-1)
                and one in the N. Virgina region (us-east-1).  &nbsp;
                <Link
                    className="text-blue-800"
                    href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-certificate-issuer">
                    SSL/TLS certificates for viewer requests to a CloudFront distribution must be requested or imported from the AWS us-east-1 region.
                </Link>
                This certificate will be linked to the CloudFront distribution as a custom SSL certificate (described below).
            </p>
        </TextSubSection>
    )
}