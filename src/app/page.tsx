import Nav from '@/components/Nav'
import ScrollToTop from '@/components/ScrollToTop'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Statement from '@/components/sections/Statement'
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
        <TrustedBy />
        <About />
        <Statement />
        <WhySunxbu />
        <Work />
        <Process />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
