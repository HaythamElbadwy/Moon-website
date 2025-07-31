import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Home.module.css';
// import wishTv from '../../assets/Image/wishtv .jpg';
import samsung from '../../assets/Image/samsung.png';
import android from '../../assets/Image/android.png';
import lg from '../../assets/Image/lg.png';
import sony from '../../assets/Image/sony.png';
import About from '../About/About';
import Faqs from '../Faqs/Faqs';
import Contact from '../Contact/Contact';
import windows from '../../assets/Image/windows.png';
import apple from '../../assets/Image/apple.png';
import whatsapp from '../../assets/Image/whatsappimg.jpeg';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Loader from '../Loader/Loader.jsx';
import { Lang } from '../../lang.jsx';
import { toast } from 'react-toastify';
import { data } from 'autoprefixer';
import logo from '../../assets/Image/moonlogo.png'
import playlist_section from '../../assets/Image/manage_playlist_section.png'
import { useLocation } from 'react-router-dom';


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [macAddress, setMacAddress] = useState('');
  const [deviceKey, setDeviceKey] = useState('');
  const [isLoader, setIsLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search)
  const queryMacAddress = query.get('macAddress');
  const queryDeviceKey = query.get('deviceKey');

  const selectedLanguage = localStorage.getItem("lang") || 'en';
  const langValue = Lang[selectedLanguage];
  const handleLogin = async (e, type, mac, key) => {

    setIsLoading(true);
    if (type != 'fromQuery') {
      e.preventDefault();
    }

    try {
      const response = await fetch('https://moon-smy9.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          macAddress: mac == "default" ? macAddress : mac,
          deviceKey: key == "default" ? deviceKey : key
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        const newMac = mac == "default" ? macAddress : mac
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('macAddress', newMac); // Store MAC address
        console.log(data);

        setIsLoggedIn(true);
        toast.success(data.message, {
          theme: 'dark'
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000)

      } else {

        toast.error(data.message, {
          theme: 'dark'
        })
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false)
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  };

  useEffect(() => {
    const loggedIn = checkAuth();
    setIsLoggedIn(loggedIn);
    setTimeout(() => setIsLoader(false), 1000)
  }, []);

  useEffect(() => {
    if (queryMacAddress && queryDeviceKey) {
      setMacAddress(queryMacAddress)
      setDeviceKey(queryDeviceKey)
      handleLogin('e', 'fromQuery', queryMacAddress, queryDeviceKey)
    }
  }, []);

  const handleScroll = () => {
    const isMobile = window.innerWidth < 768; // define breakpoint for mobile
    const scrollAmount = isMobile ? window.innerHeight * 1 : window.innerHeight * 0.6; // 120vh للموبايل و 60vh للباقي

    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isLoader ? <Loader /> : <>
        <section className={classes.home} id="home">
          <div className={classes.layout}>
            <div className="text-white h-full lg:h-screen py-6 lg:py-16 flex justify-center items-center flex-col">
              {/* {isLoggedIn ? null :
                <h1 className={`${classes.managePlaylist_title} text-2xl lg:text-3xl text-center mt-[2rem]`}>{langValue['ManagePlaylist']}</h1>
              } */}
              <div className={`w-[100%] flex justify-end h-full`}>
                {/* {isLoggedIn ? null :
                  <div className={`${classes.macaddres} mt-4 rounded-xl`}>
                    <form onSubmit={(e) => handleLogin(e, 'fromClick', 'default', 'default')} id="login-form" className="max-w-xs lg:max-w-sm mx-auto rounded-sm p-6">
                      <h1 className="text-lg lg:text-2xl mb-5 text-center">{langValue['LoginPlaylist']}</h1>

                      <div className="mb-5">
                        <label htmlFor="macAddress" className="block mb-2 text-sm lg:text-base text-white">MAC ADDRESS</label>
                        <input
                          type="text"
                          id="macAddress"
                          value={macAddress}
                          onChange={(e) => {
                            let input = e.target.value;
                            input = input.replace(/[^a-zA-Z0-9]/g, '');
                            const formatted = input.match(/.{1,2}/g)?.join(':') || '';
                            setMacAddress(formatted);
                          }}
                          className="w-full h-full p-2.5 bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          required
                        />

                      </div>

                      <div className="mb-5">
                        <label htmlFor="deviceKey" className="block mb-2 text-sm lg:text-base text-white">DEVICE KEY</label>
                        <input
                          type="text"
                          id="deviceKey"
                          value={deviceKey}
                          onChange={(e) => setDeviceKey(e.target.value)}
                          className="w-full p-2.5 bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className={`${classes.login_btn} w-full py-2.5 text-white rounded-lg focus:ring focus:outline-none`}
                      >
                        {isLoading ?
                          <i className='fas fa-spinner fa-spin text-2xl'></i>
                          : langValue['Login']}

                      </button>
                    </form>
                  </div>
                } */}
                <div className={`${classes.parent_title} w-[600px]`}>
                  <h1 className={`${classes.wish_title} mb-[20px] text-3xl lg:text-4xl sm:text-4xl font-bold max-w-3xl mx-auto`}>MOON Tv</h1>
                  <p className="text-[21px] lg:text-2xl max-w-3xl mx-auto">
                    {langValue['WishTvWebsite']}
                  </p>
                  <button onClick={handleScroll}
                    className={`${classes.btn_manage} w-[300px] h-[47px] bg-[#B5A5C9] mt-[23px] text-white text-[23px] font-bold rounded-lg focus:ring focus:outline-none`}>
                    {langValue['ManagePlaylistTitle']}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <FloatingWhatsApp phoneNumber="+1234567890"  // Replace with your WhatsApp number
            accountName="MoonTV"  // Customize with your name or business name
            avatar={logo} // Optional avatar or logo image
            statusMessage="Typically replies within 1 hour"
            chatMessage="Hello! How can we help you?"
            allowEsc
            allowClickAway
            className='text-black w-[18rem]'
            placeholder='Send Us Your Proplem'>
          </FloatingWhatsApp>
        </section>

        {/* <section
          className={`${classes.poster} w-full h-screen bg-cover bg-center sm:h-96 md:h-[60vh] lg:h-screen z-10 bg-no-repeat`}>
        </section> */}

        {/* Start Login Section */}
        {isLoggedIn ? null : <section className={`bg-[#E7E7E7] overflow-hidden py-10 z-10 text-center`}>
          <h3 className={`text-[28px] font-bold mb-8 text-black`}>{langValue['ManagePlaylist']}</h3>
          <div className="flex flex-col lg:flex-row justify-center items-center px-4">
            {/* Left Side Image */}
            <div className={`${classes.left_side} lg:mb-0`}>
              <img src={playlist_section} alt="playlist_section" className='lg:w-[95%] md:w-[99%]' />
            </div>
            {/* Right Side Form */}
            <div className={`${classes.right_side} w-full max-w-md lg:ml-8`}>
              <div className={`${classes.macaddres} rounded-xl`}>
                <form
                  onSubmit={(e) => handleLogin(e, 'fromClick', 'default', 'default')}
                  id="login-form"
                  className={`${classes.form} max-w-xs lg:mx-0 md:mx-auto lg:max-w-sm rounded-sm lg:p-4 md:p-3 md:pt-0`}
                >
                  {/* MAC ADDRESS Field */}
                  <div className="mb-6">
                    <label
                      htmlFor="macAddress"
                      className="block mb-2 text-sm text-start lg:text-base text-[#535353] font-bold"
                    >
                      MAC ADDRESS
                    </label>
                    <input
                      type="text"
                      id="macAddress"
                      value={macAddress}
                      onChange={(e) => {
                        let input = e.target.value;
                        input = input.replace(/[^a-zA-Z0-9]/g, '');
                        const formatted = input.match(/.{1,2}/g)?.join(':') || '';
                        setMacAddress(formatted);
                      }}
                      className="w-full p-2.5 py-3 bg-[#2A2A2ACC] border text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Device Key Field */}
                  <div className="mb-6">
                    <label
                      htmlFor="deviceKey"
                      className="block mb-2 text-start text-sm lg:text-base text-[#535353] font-bold"
                    >
                      DEVICE KEY
                    </label>
                    <input
                      type="text"
                      id="deviceKey"
                      value={deviceKey}
                      onChange={(e) => setDeviceKey(e.target.value)}
                      className="w-full p-2.5 py-3 bg-[#2A2A2ACC] border text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`${classes.login_btn} w-full h-[47px] bg-[#B5A5C9] mt-3 text-white text-[23px] font-bold rounded-lg focus:ring focus:outline-none`}
                  >
                    {isLoading ? (
                      <i className='fas fa-spinner fa-spin text-2xl'></i>
                    ) : (
                      langValue['ManagePlaylistTitle']
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>}
        {/* End Login Section */}


        <section className={`bg-black py-20 text-center overflow-hidden z-10 ${classes.slider_section}`}>
          <h3 className="text-white mb-8 text-lg lg:text-2xl">
            {langValue['WishTvDevice']}
          </h3>

          {/* Marquee Container */}
          <div className={classes.marqueeWrapper}>
            <div className={`${classes.marqueeContent} flex space-x-8 justify-center items-center`}>
              {/* Original Set of Images */}
              <img src={samsung} className="w-40 lg:w-64 mx-4" alt="Samsung" />
              <img src={android} className="w-40 lg:w-40 h-[3rem]  mx-4" alt="Android" />
              <img src={lg} className="w-32 lg:w-32  mx-4" alt="LG" />
              <img src={sony} className="w-40 lg:w-48  mx-4" alt="Sony" />
              <img src={windows} className="w-40 lg:w-48  mx-4" alt="Windows" />
              <img src={apple} className="w-40 lg:w-40  mx-4" alt="Apple" />

              {/* Duplicate Set of Images */}
              <img src={samsung} className="w-40 lg:w-64  mx-4" alt="Samsung" />
              <img src={android} className="w-40 lg:w-40 h-[3rem]  mx-4" alt="Android" />
              <img src={lg} className="w-32 lg:w-32  mx-4" alt="LG" />
              <img src={sony} className="w-40 lg:w-48  mx-4" alt="Sony" />
              <img src={windows} className="w-40 lg:w-48  mx-4" alt="Windows" />
              <img src={apple} className="w-40 lg:w-40  mx-4" alt="Apple" />
            </div>
          </div>
        </section>

        <About />
        <Faqs />
        <Contact />
      </>
      }
    </>
  );
}
