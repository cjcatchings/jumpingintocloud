import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})
 

export const metadata = {
  title: 'Jumping into Cloud',
  description: 'My progress in learning AWS (and more)',
}

const bodyClassName = `${poppins.className} flex h-full dark:bg-black`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bodyClassName}>{children}</body>
    </html>
  )
}