import { Button } from '../../ui/button'
import bannerImage from '/banner_image.png'

const HeroSection = () => {
  return (
    <section className="bg-gray-50 px-[4%]">
    <div className="container grid items-center gap-6 py-12 md:grid-cols-2 md:py-14">
      <div className="flex flex-col space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Learn with expert
            <br />
            anytime anywhere
          </h1>
          <p className="max-w-[500px] text-md text-muted-foreground">
            Our mision is to help people to find the best course online and learn with expert anytime, anywhere.
          </p>
        </div>
        <div>
          <Button className="">Create Account</Button>
        </div>
      </div>
      <div className="relative h-[400px] w-full">
        <img
          src={bannerImage}
          width="450px"
          alt="Students learning"
          className="object-cover"
        />
      </div>
    </div>
  </section>

  )
}

export default HeroSection