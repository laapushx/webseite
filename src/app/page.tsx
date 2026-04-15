import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import Work from '@/components/sections/Work'
import WhySunxbu from '@/components/sections/WhySunxbu'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <SocialProof />
        <Work />
        <WhySunxbu />
        <Process />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
