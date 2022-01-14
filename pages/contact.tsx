/* eslint-disable @next/next/no-img-element */
import Fade from 'react-reveal/Fade';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ScrollableBox from '../src/components/molecules/ScrollableBox';
import { Contact } from '../src/types/University';
import Heading from '../src/components/molecules/Heading';

const ContactPage: NextPage = () => {
  const [contacts, setContacts] = useState<Contact[] | null>([]);
    
  useEffect(() => {
    const fetchContact = async () => {
      const fetchedContact = await fetch('https://admin-your-school-univday.herokuapp.com/api/v1/contact');
      const contacts = await fetchedContact.json();
      setContacts(contacts);
    };
    fetchContact();
  }, []);
  return (
    <>
      <Head>
        <title>Univday | Contact Person</title>
      </Head>
      <ScrollableBox>
        <Fade>
          <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold m-8 ml-4 px-6 py-2 w-max text-gray-700 border-b-2 border-gray-700 bg-gray-200 rounded'>Contact Person</h1>
        </Fade>
        { 
          contacts?.map((contact, i) => (
            <Fade key={contact._id} delay={250*i}>
              <div className='p-5 m-4 max-w-max flex cursor-default hover:text-gray-700 text-gray-50 border-b-2 hover:border-gray-700 bg-purple-200 rounded bg-opacity-30 hover:bg-opacity-100 text-2xl transition duration-500 ease-in-out shadow-inner'>
                <div>
                  <p className='text-xl font-bold text-gray-700'>{contact.name}</p>
                  <a href={`https://wa.me/${contact.contact}`}>
                    <p className='text-base text-gray-700'>{contact.contact}</p>
                  </a>
                </div>
              </div>
            </Fade>
          ))
        }
      </ScrollableBox>
      {
        !contacts?.length && <Heading animation={true} title='sedang me-load data' />
      }
    </>
  );
};

export default ContactPage;
