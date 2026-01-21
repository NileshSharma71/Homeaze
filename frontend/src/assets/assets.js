import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './doc16.png'
import doc17 from './doc17.png'
import doc18 from './doc18.png'
import doc19 from './doc19.png'
import cleaner from './cleaner.svg'
import electrician from './electrician.svg'
import mechanic from './mechanic.svg'
import outdoor from './outdoor.svg'
import personal from './personal.svg'
import plumber from './plumber.svg'
import repair from './repair.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'mechanic',
        image: mechanic
    },
    {
        speciality: 'cleaner',
        image: cleaner
    },
    {
        speciality: 'plumber',
        image: plumber
    },
    {
        speciality: 'electrician',
        image: electrician
    },
    {
        speciality: 'repair',
        image: repair
    },
    {
        speciality: 'outdoor',
        image: outdoor
    },
    {
        speciality: 'personal',
        image: personal
    },
]

export const workers = [
    {
        _id: 'doc1',
        name: 'Rahul',
        image: doc1,
        speciality: 'mechanic',
        degree: 'iti',
        experience: '4 Years',
        about: 'Mechanical Engineer , with strong skill in car mechanical parts repairing',
        fees: '540 Rs per hrs',
        address: {
            line1: '18th Cross, Delhi',
            line2: 'Circle, Ring Road, Rohini'
        }
    },
    {
        _id: 'doc2',
        name: 'Aman',
        image: doc2,
        speciality: 'mechanic',
        degree: 'B.sc',
        experience: '3 Years',
        about: 'Mechanical Engineer , with strong skill in Bike mechanical parts repairing',
        fees: '670 Rs per hrs',
        address: {
            line1: '27th Cross, Bumbai',
            line2: 'Circle, Ring Road, Vasai'
        }
    },
    {
        _id: 'doc3',
        name: 'Rohit',
        image: doc3,
        speciality: 'mechanic',
        degree: 'BA',
        experience: '1 Years',
        about: 'Mechanical Engineer , with strong skill in Elevator mechanical parts repairing',
        fees: '480 Rs per hrs',
        address: {
            line1: '37th Cross, Delhi',
            line2: 'Circle, Ring Road, 18 sector'
        }
    },
    {
        _id: 'doc4',
        name: 'Suresh',
        image: doc4,
        speciality: 'electrician',
        degree: 'iti',
        experience: '2 Years',
        about: 'Electric Engineer , with strong Knowledge in Fan parts',
        fees: '478 Rs per hrs',
        address: {
            line1: '47th Cross, Jaipur',
            line2: 'Circle, Ring Road, Mahapura'
        }
    },
    {
        _id: 'doc5',
        name: 'Karan',
        image: doc5,
        speciality: 'electrician',
        degree: 'B.sc',
        experience: '4 Years',
        about: 'Electric Engineer , with strong Knowledge in Circuit parts',
        fees: '178 Rs per hrs',
        address: {
            line1: '57th Cross, Jaipur',
            line2: 'Circle, Ring Road, 200fit'
        }
    },
    {
        _id: 'doc6',
        name: 'Arjun',
        image: doc6,
        speciality: 'plumber',
        degree: 'BA',
        experience: '2 Years',
        about: 'Plumber , with strong Knowledge all type of water pipe repairing',
        fees: '188 Rs per hrs',
        address: {
            line1: '57th Cross, Alwar',
            line2: 'Circle, Ring Road, HKM nagar'
        }
    },
    {
        _id: 'doc7',
        name: 'Vikram',
        image: doc7,
        speciality: 'plumber',
        degree: 'B.sc',
        experience: '4 Years',
        about: 'Plumber , with strong Knowledge all bended pipes',
        fees: '358 Rs per hrs',
        address: {
            line1: '17th Cross, Bharatpur',
            line2: 'Circle, Ring Road, tunky'
        }
    },
    {
        _id: 'doc8',
        name: 'Ananya',
        image: doc8,
        speciality: 'cleaner',
        degree: 'iti',
        experience: '3 Years',
        about: 'Cleaner , profeciancy in Bathroom cleaning',
        fees: '258 Rs per hrs',
        address: {
            line1: '27th Cross, Gujarat',
            line2: 'Circle, Ring Road, Gandhi nagar'
        }
    },
    {
        _id: 'doc9',
        name: 'Pooja',
        image: doc9,
        speciality: 'cleaner',
        degree: 'B.sc',
        experience: '1 Years',
        about: 'Cleaner , profeciancy in Kitchen cleaning',
        fees: '468 Rs per hrs',
        address: {
            line1: '37th Cross, UP',
            line2: 'Circle, Ring Road, sarah kunt'
        }
    },
    {
        _id: 'doc10',
        name: 'Mohit',
        image: doc10,
        speciality: 'cleaner',
        degree: 'BA',
        experience: '2 Years',
        about: 'Cleaner , profeciancy in water tank cleaning',
        fees: '438 Rs per hrs',
        address: {
            line1: '47th Cross, Bihar',
            line2: 'Circle, Ring Road, yamuna nagar'
        }
    },
    {
        _id: 'doc11',
        name: 'Rakesh',
        image: doc11,
        speciality: 'repair',
        degree: 'iti',
        experience: '4 Years',
        about: 'Repairing skill, with strong background in Gyger repairing',
        fees: '48 Rs per hrs',
        address: {
            line1: '57th Cross, Ajmer',
            line2: 'Circle, Ring Road, Blossom academy'
        }
    },
    {
        _id: 'doc12',
        name: 'Nitin',
        image: doc12,
        speciality: 'repair',
        degree: 'B.sc',
        experience: '4 Years',
        about: 'Repairing skill, with strong background in Refrigerator repairing',
        fees: '48 Rs per hrs',
        address: {
            line1: '57th Cross, Assam',
            line2: 'Circle, Ring Road, silly vally'
        }
    },
    {
        _id: 'doc13',
        name: 'Abhishek',
        image: doc13,
        speciality: 'repair',
        degree: 'BA',
        experience: '4 Years',
        about: 'Repairing skill, with strong background in AC repairing',
        fees: '138 Rs per hrs',
        address: {
            line1: '17th Cross, Kolkata',
            line2: 'Circle, Ring Road, gd plot'
        }
    },
    {
        _id: 'doc14',
        name: 'Pradeep',
        image: doc14,
        speciality: 'outdoor',
        degree: 'iti',
        experience: '3 Years',
        about: 'Provide outdoor services , master in house painting',
        fees: '60 Rs per hrs',
        address: {
            line1: '27th Cross, Goa',
            line2: 'Circle, Ring Road, Church road'
        }
    },
    {
        _id: 'doc15',
        name: 'Manish',
        image: doc15,
        speciality: 'outdoor',
        degree: 'B.sc',
        experience: '1 Years',
        about: 'Provide outdoor services , master in flowers management',
        fees: '30 Rs per hrs',
        address: {
            line1: '37th Cross, Bihar',
            line2: 'Circle, Ring Road, Dps vally'
        }
    },
    {
        _id: 'doc16',
        name: 'Himanshu',
        image: doc15,
        speciality: 'outdoor',
        degree: 'ITI',
        experience: '1 Years',
        about: 'Provide outdoor services , master in roof-top management',
        fees: '302 Rs per hrs',
        address: {
            line1: '37th Cross, Assam',
            line2: 'Circle, Ring Road, tree vally'
        }
    },
    {
        _id: 'doc17',
        name: 'Sanjay',
        image: doc15,
        speciality: 'personal',
        degree: 'BA',
        experience: '2 Years',
        about: 'Provide personal services , master in mehandi designing',
        fees: '303 Rs per hrs',
        address: {
            line1: '37th Cross, Bihar',
            line2: 'Circle, Ring Road, 22feet road'
        }
    },
    {
        _id: 'doc18',
        name: 'Ajay',
        image: doc15,
        speciality: 'personal',
        degree: 'B.sc',
        experience: '3 Years',
        about: 'Provide personal services , master in body tattoing',
        fees: '304 Rs per hrs',
        address: {
            line1: '37th Cross, Bihar',
            line2: 'Circle, Ring Road, 89 street'
        }
    },
    {
        _id: 'doc19',
        name: 'Neha',
        image: doc15,
        speciality: 'personal',
        degree: 'ITI',
        experience: '4 Years',
        about: 'Provide personal services , good skill in hair cutting',
        fees: '305 Rs per hrs',
        address: {
            line1: '37th Cross, Bihar',
            line2: 'Circle, Ring Road, 77 street'
        }
    },
]