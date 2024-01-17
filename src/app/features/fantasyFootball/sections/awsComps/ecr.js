import TextSubSection from '@/components/text/subSection'

export default function EcrSummary(){

    return (
        <TextSubSection
            sectionInitiallyInvisible={false}
            testId="ecr"
            header="Elastic Container Registry">
        <p className="pr-1">Amazon Elastic Container Registry (ECR) is a registry offered by AWS to host and store Docker images.  These images can be used 
        to deploy Docker containers via Amazon Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), standalone EC2 instances or on-premises 
        servers.  My application primarily runs on two containers:</p>
        <ul className="list-disc pt-2">
            <li className="ml-6 mr-2">Middleware:  Runs a Python Flask container that executes application logic such as authentication, data retrieval (roster, players) and 
            transaction execution (roster changes, add/drop players, request trades) alongside administrative actions (process trades, calculate scores, update injury status).</li>
            <li className="ml-6 mr-2">Frontend:  A NextJS application container that runs on a NodeJS server.  This performs server-side rendering (SSR) to deliver content to web 
            browsers more quickly and reduce the burden on the browser to render React/JSX code into HTML.  Material UI is used as a React component library.</li>
        </ul>
        <p className="pt-2 mr-2">The data layer runs on MongoDB&apos;s free cloud offering called Atlas.  I initially attempted to run MongoDB as a separate container with the v7.0.5 image 
        using an Amazon Elastic Block Storage (EBS) volume to store the data. Unfortunately the memory requirements make it prohibitive to run in AWS&quot;s free tier.</p>
        <p className="pt-2 mr-2">I first created two public repositories in ECR - one for the middleware image and another for the frontend image.  I considered creating a private repo but I do not mind sharing these 
         images with the public.  Plus the 5TB free tier limit for images in public repositories provides some buffer room for future projects.  I specified a registry alias and an application name for each repository 
         that will host an image.  These values will be important when it is time to tag and push the images to ECR.</p>
        <p className="pt-2 mr-2">Next step was to log into my public ECR repo.  I had already built the Docker images for my application (details to come).</p>
        <p className="pt-2 mr-2">In order to push them to ECR, I had to 
        authenticate with the ECR public repository.  This can be done via CLI with the following command:</p>
        <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1"><code className="text-xs pl-1">
        {`>>> aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws`}
        </code></pre>
        <p className="pt-2 mr-2">If you have an AWS profile configured (whether via access key and secret or logging in via Identity Center), a prompt saying &quot;Login successful&quot; should be displayed.
          Next step is obtain the Image ID of the image that you want to push to ECR.  This can be done by running the following command: </p>
        <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1"><code className="text-xs pl-1">
        {`>>> docker images`}
        </code></pre>
        <p className="pt-2 mr-2">
            This returns a list of of Docker images in the following format:
        </p>
        <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
        {`>>> docker images
REPOSITORY                       TAG       IMAGE ID       CREATED         SIZE
elvira/fantasyfootball-fe        v0.1      123456abcdef   3 days ago      215MB
elvira/fantasyfootball-mw        v0.1      654321fedcba   3 days ago      205MB`}
        </code></pre>
        <p className="pt-2 mr-2">The <code>IMAGE ID</code> value is what you need to pass into the following command to &quot;tag&quot; the image for your ECR repo.</p>
        <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
{`>>> docker tag <imageID> public.ecr.aws/<registry_alias>/<app_name>`}
        </code></pre>
        <p className="pt-2 mr-2">Remember that each repository created included a registry alias and an app name.  In my case, the paths were as follows:</p>
        <ul className="list-disc pt-2">
            <li className="ml-6 text-sm"><code className="text-xs bg-slate-300 w-9/12 text-wrap mt-1"> public.ecr.aws/n0u5h2y6/cjc-fantasy-football-mw </code> (application layer)</li>
            <li className="ml-6 text-sm"><code className="text-xs bg-slate-300 w-9/12 text-wrap mt-1"> public.ecr.aws/n0u5h2y6/cjc-fantasy-football-fe </code> (frontend)</li>
        </ul>
        <p className="pt-2 mr-2">The following command was used to tag the images prior to pushing to ECR:</p>
        <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
        {`>>> docker tag 123456abcdef elvira/fantasyfootball-fe
>>> docker tag 654321fedcba elvira/fantasyfootball-mw`}
        </code></pre>
        <p className="inline pt-2">Another option with the <code className="text-xs bg-slate-300 w-9/12 text-wrap mt-1">&lt;respository_name&gt;/&lt;tag&gt;</code> format:</p>
        <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
        {`>>> docker tag elvira/fantasyfootball-fe:v0.1 elvira/fantasyfootball-fe
>>> docker tag elvira/fantasyfootball-mw:v0.1 elvira/fantasyfootball-mw`}
        </code></pre>
        <p className="pt-2 mr-2">Having tagged the images in their respective ECR repositories, I could now push them with the following command:</p>
        <pre className="mx-6 bg-slate-300 w-9/12 text-wrap mt-1 pl-1"><code className="text-xs pl-1">
        {`>>> docker push elvira/fantasyfootball-fe
>>> docker push elvira/fantasyfootball-mw`}
        </code></pre>
        </TextSubSection>
    )
}