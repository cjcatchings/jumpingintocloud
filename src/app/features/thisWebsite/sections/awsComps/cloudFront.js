import Link from 'next/link'
import TextSubSection from '@/components/text/subSection'

export default function CloudFrontSummary(){

    return (
        <TextSubSection
            sectionInitiallyVisible={false}
            testId="cloudfront"
            header="Amazon CloudFront">
            <p className="pr-1">CloudFront is a content distribution network (CDN) provided by AWS.  It stores content from individual origins (S3 bucket, 
            Application Load Balancer, AWS Lambda function or other custom origins) in regional edge locations across the globe.  This allows end-users to 
            retrieve content from a location closer to them, reducing request latency.</p>
            <p className="pt-2 mr-2">With my content stored in an S3 bucket, I created a CloudFront distribution and specified my bucket as the origin.  CloudFront 
            retrieves the content of my bucket and stores it in its edge locations.  You can reduce costs by limiting the regions to which CloudFront delivers 
            your content if you expect most of your requests to come from those regions.  CloudFront provides a generated URL for your distribution (&lt;random_s
            tring&gt;.cloudfront.net), which will contain the same content as the S3 bucket origin.</p>
            <p className="pt-2 mr-2">In order to create a Route 53 Alias record for this distribution (to direct traffic from www.jumpingintocloud.com to it), I needed 
            to associate an SSL certificate from ACM to the distribution and add an alternate domain name.  I added www.jumpingintocloud.com as an alternate domain 
            name and used the ACM public certificate I created in the us-east-1 N. Virginia region (remember, SSL certificates for CloudFront distributions must be 
            based in this region) to set up SSL/TLS association of the distribution with the Route 53 created domain for this website.</p>
            <p className="pt-2 mr-2">The last step was to add an Alias record to the hosted zone for this domain in Route 53.  I specified the www sub-domain and selected 
            &quot;CloudFront distribution&quot; as the resource type.  From there I was able to select my CloudFront distribution.  Now, requestss to www.jumpingintocloud.com 
            are directed to this CloudFront distribution, which serves content from my static NextJS web app stored in an S3 bucket.</p>
        </TextSubSection>
    );

}