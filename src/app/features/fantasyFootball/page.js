import Route53Summary from "./sections/awsComps/route53"
import FFAwsCompIntro from "./sections/intro"
import EcrSummary from "./sections/awsComps/ecr"
import EcsSummary from "./sections/awsComps/ecs"
import ElbSummary from "./sections/awsComps/elb"

export default function FantasyFootballDesc(){

    return (
        <main className="relative flex flex-col justify-between w-full">
            <FFAwsCompIntro>
                <Route53Summary />
                <EcrSummary />
                <EcsSummary />
                <ElbSummary />
            </FFAwsCompIntro>
        </main>
    )
}