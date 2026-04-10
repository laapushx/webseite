import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import Services from '@/components/sections/Services'
import WhySunxbu from '@/components/sections/WhySunxbu'
import Process from '@/components/sections/Process'
import Work from '@/components/sections/Work'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <WhySunxbu />
        <Process />
        <Work />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
