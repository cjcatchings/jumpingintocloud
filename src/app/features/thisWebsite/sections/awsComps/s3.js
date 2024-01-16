import Link from 'next/link'
import TextSubSection from '@/components/text/subSection'

export default function S3Summary() {

    return (
        <TextSubSection
            sectionInitiallyVisible={false}
            testId="s3"
            header="Amazon S3">
            <p className="pr-1">Amazon Simple Storage Service (or S3) is an object-based storage service that provides
                access to objects via HTTP/HTTPS protocols.  It can be used for highly-available storage, backup and disaster
                recovery alongside web-hosting functionality.  Objects are stored in buckets that can be configured to have their
                own security/access rules (bucket policies).  S3 can store a hypothetically infinite amount of data in any format.</p>
            <p className="pt-2">I created a
                <Link href="https://nextjs.org/">NextJS</Link> app for this static website.
                NextJS are best run on a NodeJS/Express based server that can perform server-side rendering (SSR) so that
                web browsers do not have to render ReactJS markup into HTML.  S3 can host only static websites so I
                configured my NextJS app to generate static output to be served from an S3 bucket that I created.  There are
                AWS services that allow you to run dynamic NextJS web apps that perform SSR (ECS, Amplify, AppRunner).  However,
                static web hosting serves the purpose for this website (some of my other apps use NextJS dynamic featuers).</p>
            <p className="pt-2">I created an S3 bucket exclusively to hold the generated files for my NextJS app.  S3 buckets can
                be configured for static website hosting.  However, in order to take advantage of S3/CloudFront&apos;s Origin Access Control
                feature, static web hosting must be turned off.</p>
            <p className="pt-2">Origin Access Control (OAC) allows you to restrict access to website content hosted on S3 to the CloudFront distribution hosting the content.
                This can be beneficial for performance and cost reasons:</p>
                <ol className="pt-2 list-decimal">
                    <li className="ml-6">CloudFront hosts the content of your S3 bucket in edge locations across the globe, delivering the content faster to
                        end-users from a location geographically closest to them.</li>
                    <li className="ml-6">Delivery of data from CloudFront ($0.085/GB with the first 1TB each month free) is less expensive than from S3
                        ($0.09 USD/GB with the first 100GB each month free).</li>
                </ol>
            <p className="pt-2 pr-0.5">In order to ensure that my content is served from CloudFront and end-users cannot access the S3 bucket directly, I configured OAC on my bucket.  In order to do that,
                I used the bucket policy below.  This bucket policy restricts read (GET) access to my bucket (the &quot;origin&quote; of my CloudFront distribution) to the Amazon CloudFront service only if
                 the source Amazon Resource Number (ARN) of the request from the CloudFront service is my distribution.</p>
                <pre className="mx-6 bg-slate-300 w-9/12 text-wrap"><code className="text-xs pl-1">
                    {`{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<my-bucket-name>/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::<aws-acct-number>:distribution/<cloudfront-distribution-id>"
                }
            }
        }
    ]
}`}
                </code></pre>
        </TextSubSection>
    )
}