import SectionHero from './(landing)/SectionHero'
import SectionHowItWorks from './(landing)/SectionHowItWorks'
import SectionWhy from './(landing)/SectionWhy'

export default function LandingPage() {
  return (
    <main>
      <SectionHero />
      <SectionWhy />

      <SectionHowItWorks />
    </main>
  )
}
