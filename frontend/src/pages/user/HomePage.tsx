import CategorySection from '@/components/user/home/CategorySection'
import Header from '@/components/user/home/Header'
import HeroSection from '@/components/user/home/HeroSection'

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
        <Header/>
    <main className=''>
        <HeroSection/>
        <CategorySection/>
    </main>
    </div>
  )
}

export default HomePage