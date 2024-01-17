import Link from 'next/link'
import TextSubSection from '@/components/text/subSection'

export default function Route53Summary(){

    return (
        <TextSubSection
            sectionInitiallyVisible={false}
            testId="route53"
            header="Amazon Route 53"
        >Just like this website, the fantasy football application endpoint uses Route 53 as its DNS.  More details can be found 
        <Link className="text-blue-600" href="/features/thisWebsite?route53=#route53"> here.  </Link>  
            I added an Alias record for fantasyfootball.jumpingintocloud.com to point to an Amazon ELB Application Load Balancer.</TextSubSection>
    )
}