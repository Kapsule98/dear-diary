import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div>
      <h1>
        Homepage
      </h1>
      <p>
        <Link href="/diary">Click here to go to your diary</Link>
      </p>
    </div>
    
  )
}
