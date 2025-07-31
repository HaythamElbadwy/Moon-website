import React, { useEffect, useState } from 'react'
import styles from './About.module.css';
import mobil from '../../assets/Image/mobile movie screen.png'
import appStore from '../../assets/Image/appstore.png'
import about_one from '../../assets/Image/about_section_one.png'
import about_two from '../../assets/Image/about_section_two.png'
import { Lang } from '../../lang.jsx';

export default function About() {

  let [count, setCount] = useState(0);
  const selectedLanguage = localStorage.getItem("lang") || 'en';
  const langValue = Lang[selectedLanguage];
  useEffect(() => { }, [])
  return (
    <>
      {/* Start First About Secion */}
      <div className="flex py-[4rem] flex-col lg:flex-row items-center justify-center bg-[#E7E7E7]">
        <div className='lg:w-[90%] md:w-[98%] flex flex-col lg:flex-row items-center justify-center lg:space-x-8'>
          <div className="w-full md:w-1/2 lg:w-1/2 lg:text-left px-4">
            <h1 className="font-bold text-2xl lg:text-[2rem] text-[#574F6CF1] leading-tight">
              {langValue['wishtvAboutOneTitle']}
            </h1>
            <p className="text-[#413F3F] text-lg lg:text-[1.5rem] mt-4">
              {langValue['wishtvAboutOneDesc']}
            </p>
          </div>
          <div className={`${styles.first_img} w-full lg:w-1/2`}>
            <img src={about_one} alt="TV media player" className="lg:w-[90%] md:w-[95%]" />
          </div>
        </div>
      </div>
      {/* End First About Secion */}

      {/* Start Second About Secion */}
      <div className={`${styles.about_two} flex py-[4rem] flex-col lg:flex-row items-center justify-center bg-[#E7E7E7]`}>
        <div className='lg:w-[90%] md:w-[98%] flex flex-col lg:flex-row items-center justify-center lg:space-x-8'>
          <div className={`${styles.second_img} w-full lg:w-1/2`}>
            <img src={about_two} alt="TV media player" className="lg:w-[90%] md:w-[95%]" />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 lg:text-left px-4">
            <h1 className="font-bold text-2xl lg:text-[2rem] text-[#574F6CF1] leading-tight">
              {langValue['wishtvAbouttwoTitle']}
            </h1>
            <p className="text-[#413F3F] text-lg lg:text-[1.5rem] mt-4">
              {langValue['wishtvAboutTwoDecs']}
            </p>
          </div>
        </div>
      </div>
      {/* End Second About Secion */}

      <section className="px-4 py-1 z-10 bg-[#E7E7E7]">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:space-x-8 my-8 lg:py-10">
            <div className="w-full lg:w-3/4 lg:text-left lg:ml-[6.25rem]">
              <h1 className="font-bold text-2xl text-[1.8rem] lg:text-[2.5rem] text-[#574F6CF1] leading-tight mb-6">
                {langValue['MobileVersion']}
              </h1>
              <p className="text-[#413F3F] text-lg lg:text-[1.4rem] w-[100%] lg:w-[70%] mt-4 font-medium">
                {langValue['wishtvAppAboutThree']}
              </p>
              <img src={appStore} className="w-[90%] lg:w-[75%] mr-auto" alt="App Stores" />
            </div>
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <img src={mobil} alt="Mobile Wish TV" className="m-auto w-[15rem] lg:w-[20rem]" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
