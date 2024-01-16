import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen bg-white dark:bg-slate-700 lg:mx-8">
      <div className="flex flex-col w-full">
        <header className="sticky top-0 w-full z-10 h-36">
          <div className="relative w-full h-36 bg-blue-200 dark:bg-blue-600">
            <div className="absolute bottom-4 text-6xl bg-blue-200 dark:bg-blue-600 w-full text-center">Jumping into Cloud!</div>
          </div>
        </header>
        <main className="relative flex flex-col justify-between w-full">
          <p className="text-lg pt-4 px-4">In December 2023 I passed the Amazon Web Services Certified Solutions Architect Professional Exam.  Since preparing
            for the exam (and during my overall journey in the past 2 years of obtaining expertise in cloud computing) I have become more interested
            in building more content in the cloud as well as using the content to showcase my skills and knowledge of cloud architecture.  Now that I
            am a professional-level AWS Certified Solutions Architect, I want to start using as many AWS (and other cloud) resources as I can to continue building
            my capabilities in cloud solutions architecture.</p>
          <p className="text-lg pt-4 px-4">This site (and the contents of this domain as a whole) are hosted on Amazon Web Services.  Over time,
            I will be adding content to this page to describe my journey into mastering AWS solution architecture and which AWS
            resources and services I use along the way</p>
          <p className="text-lg pt-4 px-4">A few features I have been working on that run on AWS</p>
          <ul className="text-lg px-4 list-disc">
            <li className="text-lg mx-6">
              <Link
                href="/features/thisWebsite"
                className="text-blue-600">This website (S3, CloudFront, Route 53)</Link>
            </li>
            <li className="text-lg mx-6">
              <Link
                href="/features/fantasyFootball"
                className="text-blue-600">
              A fantasy football application (ECS on EC2, ELB, Route 53, MongoDB Atlas) (WIP)</Link>
            </li>
          </ul>
        </main>
      </div>
    </div>
  )
}
