import React, { useEffect, useState } from 'react'
import styles from './PrivacyPolicy.module.css';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import whatsapp from '../../assets/Image/moonlogo.png';
import { toast } from 'react-toastify';

export default function PrivacyPolicy() {
  const [editorHtml, setEditorHtml] = useState('');
  const getPrivacyPolicy = async () => {
    try {
      const response = await fetch(`https://moon-smy9.onrender.com/footerContent/get?page=Privacy_Policy`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: "dark"
        });
        setEditorHtml(data.footerContent.content)
        console.log(data.footerContent.content);

      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
    }
  };

  useEffect(() => {
    getPrivacyPolicy()
  }, [])
  return (
    <>
      <div class={`${styles.privacyPolicy}`}>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div>
      <FloatingWhatsApp phoneNumber="+1234567890"
        accountName="NovaTV"
        avatar={whatsapp}
        statusMessage="Typically replies within 1 hour"
        chatMessage="Hello! How can we help you?"
        allowEsc
        allowClickAway
        className='text-black w-[18rem]'
        placeholder='Send Us Your Proplem'>
      </FloatingWhatsApp>
    </>
  )
}
