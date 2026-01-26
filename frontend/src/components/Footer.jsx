import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>
                {/* left sec. */}
                <div>
                    <p className='text-xl font-medium mb-5'>Homeaze</p>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Homeaze connects you with trusted local home-service experts for repairs, cleaning, and installations. Book instantly, track progress, and pay securely. We’re committed to transparent pricing, verified professionals, and a happier, hassle-free home experience with 24/7 support included, for you always.</p>
                </div>

                {/* centre sec. */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul  className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* right sec. */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-8905186330</li>
                        <li>nileshsharma7102005@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* made with love */}
            <div>
                <hr />
                <p className='text-center'>made with ❤️ by Prateek, Nilesh</p>
            </div>
        </div>
    )
}

export default Footer