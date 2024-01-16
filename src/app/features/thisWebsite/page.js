import AWSCompIntro from './sections/awsComps/intro'
import Route53Summary from './sections/awsComps/route53'
import CertManagerSummary from './sections/awsComps/certManager'
import S3Summary from './sections/awsComps/s3'
import CloudFrontSummary from './sections/awsComps/cloudFront'
import AwsSteps from './sections/steps/awsSteps'

export default function ThisWebsite() {

    return (
        <main className="relative flex flex-col justify-between w-full">
            <AWSCompIntro>
                <Route53Summary />
                <CertManagerSummary />
                <S3Summary />
                <CloudFrontSummary />
            </AWSCompIntro>
            <AwsSteps />
        </main>
     )
}