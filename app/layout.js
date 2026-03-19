import { Open_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'EDU_DRIM',
  description: 'Build your perfect course',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
