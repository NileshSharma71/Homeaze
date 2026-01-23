import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#e7f5ec] rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* left */}
      <div className="md:w-1/2 flex flex-col gap-5 py-8 md:py-16">
        <p className="text-3xl md:text-4xl lg:text-4xl font-semibold leading-tight">
          Welcome to Homeaze – Your Trusted Partner for Professional Home Services
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <img
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            src={assets.group_profiles}
            alt=""
          />
          <p>
            Browse trusted workers and book services
            <br className="hidden sm:block" />
            effortlessly, anytime.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-7 py-2.5 rounded-full text-sm font-medium text-[#595959] shadow hover:scale-105 transition-all w-fit"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right */}
      <div className="md:w-1/2 relative flex justify-center items-end">
        <img
          className="w-full max-w-sm rounded-2xl shadow-lg md:mt-6 md:translate-x-14 md:-translate-y-2"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  )
}

export default Header
