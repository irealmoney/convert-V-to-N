import React from 'react';

import { BsFillPhoneLandscapeFill, BsInstagram } from 'react-icons/bs';
import { SlLocationPin } from "react-icons/sl";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="bg-white text-center text-[#F15A22]  lg:text-left">
      <div
        className="flex items-center justify-center border-b-2  p-6  lg:justify-between">
        <div className="mr-12 hidden lg:block">
          
        </div>

      </div>

      {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="flex flex-row max-sm:flex-col max-sm:justify-between justify-evenly items-center  max-sm:py-0">
          {/* <!-- TW Elements section --> */}

          {/* <!-- logo section --> */}
          <div className="w-1/2 max-sm:my-6 ">
                <img src="/NIK-LOGO.svg" alt="" width={200}  className='mx-auto'/>
          </div>

          {/* <!-- Products section --> */}
          {/* <div className="max-sm:my-6 text-center">
            <h6
              className="mb-4 flex text-[#F15A22] justify-center font-semibold uppercase border-b-2  pb-2">
              محصولات
            </h6>
            <p className="mb-4">
              <a className="text-[#F15A22]"
              >لوازم بهداشتی </a>
            </p>
            <p className="mb-4">
              <a className="text-[#F15A22]"
              >غذای سگ و گربه</a>
            </p>
            <p className="mb-4">
              <a className="text-[#F15A22]"
              >لوازم جانبی</a>
            </p>

          </div> */}

          {/* <!-- Contact section --> */}
          <div className="flex flex-col justify-center items-center w-1/2 max-sm:my-6 text-center">
            <div className='flex flex-row justify-center items-center'>
              <a href={'https://maps.app.goo.gl/kVr3LtKCGJw4L5MKA'} target="_blank" rel="noopener noreferrer" className=" flex text-[#F15A22] items-center justify-center ">
                <SlLocationPin className='size-8 mx-6 hover:fill-[#F15A22]'/>
              </a>
              <a href='https://www.instagram.com/petshopnik?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' target="_blank" rel="noopener noreferrer" className=" flex text-[#F15A22] items-center justify-center ">
                <IoLogoInstagram className='size-8 mx-6 hover:fill-[#F15A22]'/>
              </a>
              <a href="tel:09116663835" rel="noopener noreferrer" className="  flex text-[#F15A22] items-center justify-center">
                <BsTelephone className='size-8 mx-6 hover:fill-[#F15A22]'/>
              </a >
            </div>
            <div className='flex flex-row-reverse items-center mt-6 text-gray-600 text-sm'>
                <Link href={'/products'} className='border-l-3 border-[#F15A22] px-2'>
                    محصولات
                </Link>

                <Link href={'/support'} className='border-l-3 border-[#F15A22] px-2'>
                    پشتیبانی
                </Link>

                <Link href={'/products?q=bestsellers'} className='border-l-3 border-[#F15A22] px-2'>
                    پرفروش ترین ها
                </Link>

                <Link href={'/products?q=newest'} className='px-2'>
                    جدید ترین ها
                </Link>
            </div>
          </div>

        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="bg-whait p-6 text-center text-gray-500 max-sm:text-[8px]">
        <span >  کلیه حقوق این سایت متعلق به فروشگاه آنلاین   </span>
        <a
          className="font-bold text-neutral-600 "
          
        > پت شاپ نیک </a> می باشد
      </div>
    </footer>
  );
}
