import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to <b>Homeaze</b>, your reliable platform for booking trusted home services with ease.
            We connect skilled professionals with households, making everyday services like plumbing,
            electrical work, cleaning, and repairs simple, fast, and dependable.</p>
          <p>At Homeaze, we focus on quality, transparency, and convenience. Our platform is designed to
            help users discover verified workers, compare services, and schedule appointments at their
            preferred time—all from the comfort of their home.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision is to transform the way home services are accessed by creating a seamless,
            technology-driven experience. We aim to bridge the gap between customers and skilled
            professionals, ensuring reliable service, fair pricing, and complete peace of mind.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Quick and hassle-free booking of home services tailored to your schedule.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE: </b>
          <p>Access a wide range of verified and experienced home service professionals near you.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>TRUST & QUALITY:</b>
          <p >Skilled workers, transparent pricing, and reliable service you can count on every time.</p>
        </div>
      </div>

    </div>
  )
}

export default About
