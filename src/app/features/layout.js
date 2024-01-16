import { Poppins } from 'next/font/google'
import '../globals.css'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})


export const metadata = {
  title: 'Jumping into Cloud',
  description: 'My progress in learning AWS (and more)',
}

const bodyClassName = `${poppins.className} flex h-full dark:bg-black`

export default function FeaturesLayout({ children }) {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen bg-white dark:bg-slate-700 lg:mx-8">
      <div className="flex flex-col w-full">
        <header className="sticky top-0 w-full z-10 h-36">
          <div className="relative w-full h-36 bg-blue-200 dark:bg-blue-600">
            <div className="absolute bottom-4 text-6xl bg-blue-200 dark:bg-blue-600 w-full text-center">Jumping into Cloud!</div>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}
