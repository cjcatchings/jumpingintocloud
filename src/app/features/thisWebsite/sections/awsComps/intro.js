import Link from 'next/link'
import Image from 'next/image'
import TextSubSection from '@/components/text/subSection'

export default function AWSCompIntro({children}) {

    return (
        <>
            <p className="text-2xl pt-2 text-center">This website
                (<Link
                    href="https://www.jumpingintocloud.com"
                    className="text-blue-700 dark:text-blue-200">
                    jumpingintocloud.com
                </Link>)</p>
            <p className="text-center">Status:
                <Image
                    className="inline ml-2 mr-1"
                    src="/green-light.png"
                    alt="Available"
                    height={16}
                    width={16} />Available</p>
            <p className="pt-4 text-lg px-2">As mentioned on the home page, this website runs as an
                Amazon CloudFront distribution with an S3 Bucket as the origin.  A Route 53 Alias record was created
                to map the www.jumpingintocloud.com sub-domain to the CloudFront distribution.  A brief architectural diagram
                of the configuration is described below.</p>
            <p className="pt-4 self-center"><Image
                src="/arch_diagrams/JumpIntoCloudWebsite.png"
                alt=""
                width={800}
                height={200} /></p>
            <TextSubSection
                className="pt-4 px-4"
                sectionType="h1"
                sectionInitiallyVisible={true}
                header="AWS Components/Services">
                    {children}
            </TextSubSection>
        </>
    )

}