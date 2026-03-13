import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'EDU_DRIM',
  description: 'Build your perfect course',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
