import React, { useEffect, useState } from 'react';
import styles from './SwitchMac.module.css';
import { Lang } from '../../lang.jsx';
import { toast } from 'react-toastify';

export default function SwitchMac() {
    const [mac_address, setMacAddress] = useState(''); // State for the new MAC address
    const [isLoading, setIsLoading] = useState(false);
    const selectedLanguage = localStorage.getItem("lang") || 'en';
    const langValue = Lang[selectedLanguage];
    // Effect to run on component mount (if needed)
    useEffect(() => { }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault(); // Prevent the default form submission behavior

        const body = {
            macAddress: mac_address,
        };

        try {
            const response = await fetch('https://moon-smy9.onrender.com/user/switch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `moonOM0${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(body),
            });



            const data = await response.json();
            if (!response.ok) {
                toast(data.message, {
                    theme: 'dark'
                })
            } else {
                toast(data.message ,{
                    theme : 'dark'
                })
            }
            console.log('Success:', data);
            setMacAddress('')
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <form className="max-w-lg w-full" onSubmit={handleSubmit}>
                <h1 className="text-[#3C3C3C] text-3xl font-bold mb-5">{langValue['SwitchDevice']}</h1>

                <p className='text-[#3C3C3C] font-medium'>
                    {langValue['transferMacAddress']}</p>
                <div className="mb-5 mt-10">
                    <label htmlFor="new-mac" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {langValue['newMacAddress']} <span className='text-[#a1a1a1]'>{langValue['MaxLength']}: 17</span>
                    </label>
                    <input
                        input
                        type="text"
                        id="macAddress"
                        value={mac_address}
                        onChange={(e) => {
                            let input = e.target.value;
                            input = input.replace(/[^a-zA-Z0-9]/g, '');
                            const formatted = input.match(/.{1,2}/g)?.join(':') || '';
                            setMacAddress(formatted);
                        }}
                        className="bg-[#F5F5F5] border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        required

                    />
                </div>
                <b className="text-[13px] block text-[#7D7E81]">
                    <span className="text-red-600">{langValue['noteTwo']}:</span>
                    {langValue["noteDescTwo"]}
                </b>
                <br />
                <center>
                    <button onClick={handleSubmit} type="submit" className="text-white bg-[#B5A5C9] font-medium rounded-lg text-xm w-[205px]">
                        {isLoading ?
                            <i className='fas fa-spinner fa-spin text-2xl'></i>
                            : langValue['Save']}

                    </button>
                </center>
            </form>
        </>
    );
}
