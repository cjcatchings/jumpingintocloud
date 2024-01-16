import Link from 'next/link'
import TextSubSection from '@/components/text/subSection'

export default function AwsSteps(){

    return(<TextSubSection
        className="px-4"
        sectionType="h1"
        sectionInitiallyVisible={false}
        header="Steps">
            <p className="pr-1">Here are the steps I took to get this website hosted as a CloudFront distribution in front 
            of an S3 bucket:</p>
            <ol className="list-decimal pt-2">
                <li className="ml-6">Purchase and register a domain in Route 53.  Domains can be purchased in eu-central-1 for 9-13€.</li>
                <li className="ml-6">Request a public certificate in Amazon Certificate Manager from the us-east-1 and eu-central-1 regions.
                    <ul className="list-disc">
                        <li className="ml-6">If you want to use the same certificate for all your sub-domains, use wildcard convention (*.mydomain.com)</li>
                    </ul>
                </li>
                <li className="ml-6">Create an S3 bucket.  In order to apply OAC, the bucket must NOT be configured as a public website.</li>
                <li className="ml-6">Create a distribution in CloudFront.  Enter &quot;index.html&quot; as the default object.  Specify www.mydomain.com as an alternate domain name and select the ACM public certificate 
                from the us-east-1 region as the SSL certificate.  Note the distribution ARN and domain name for your distribution.</li>
                <li className="ml-6">Update the bucket policy of your S3 bucket to enforce OAC so that only your CloudFront distribution can access your bucket.</li>
                <li className="ml-6">Create an Alias record in the public hosted zone of your Route 53 domain.  Keep the default DNS A record type.  Select &quot;CloudFront Distribution&quot; as 
                the resource type and select your created CloudFront distribution.  Also select the ACM SSL public certificate from the drop-down below.</li>
            </ol>
    </TextSubSection>)
}