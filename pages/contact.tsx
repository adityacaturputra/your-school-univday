/* eslint-disable @next/next/no-img-element */
import Fade from 'react-reveal/Fade';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ScrollableBox from '../src/components/molecules/ScrollableBox';
import { Contact } from '../src/types/University';
import Heading from '../src/components/molecules/Heading';

const formatIndoNumber = (contacts: Contact[]) : Contact[] => {
  const formattedContacts : Contact[] = [];
  contacts.forEach((contact) => {
    const isFirstZeroEightNumber = contact.contact[0] === '0' && contact.contact[1] === '8';
    if (isFirstZeroEightNumber) {
      const newFormattedContact = `62${contact.contact.split('').slice(1, contact.contact.length).join('')}`;
      contact.contact = newFormattedContact;
    }
    formattedContacts.push(contact);
  });
  
  return formattedContacts;
};

const ContactPage: NextPage = () => {
  const [contacts, setContacts] = useState<Contact[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  
  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts') || '{}');
      const isPassedOneHour = new Date().getTime() > new Date(contactsFromLocalStorage?.updatedAt).getTime() + 3600000;
      if (!contactsFromLocalStorage.data || isPassedOneHour) {
        const fetchedContact = await fetch('https://admin-your-school-univday.herokuapp.com/api/v1/contact');
        const contacts : Contact[] = await fetchedContact.json();
        const newFormattedContacts : Contact[] = formatIndoNumber(contacts);
        const localStorageContacts = {data: newFormattedContacts, updatedAt: new Date()};
        localStorage.setItem('contacts', JSON.stringify(localStorageContacts));
        setContacts(newFormattedContacts);
      } else {
        setContacts(contactsFromLocalStorage.data);
      }
      setLoading(false);
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
              <div className='p-5 m-4 max-w-max flex hover:text-gray-700 text-gray-50 border-b-2 hover:border-gray-700 bg-purple-200 rounded bg-opacity-30 hover:bg-opacity-100 text-2xl transition duration-500 ease-in-out shadow-inner'>
                <a href={`https://wa.me/${contact.contact}`} target="_blank" rel="noopener noreferrer">
                  <div>
                    <p className='text-xl font-bold text-gray-700'>{contact.name}</p>
                    <div className='flex'>
                      <img className='mr-2 w-4' src="/images/user.svg" alt="contact-icon" />
                      <p className='text-sm font-bold my-2 text-gray-500'>{contact.position}</p>
                    </div>
                    <div className='flex'>
                      <img className='mr-2 w-4' src="/images/phone.svg" alt="contact-icon" />
                      <p className='text-base font-semibold text-gray-700'>{contact.contact}</p>
                    </div>
                  </div>
                </a>
              </div>
            </Fade>
          ))
        }
      </ScrollableBox>
      {
        loading && <Heading animation={true} title='sedang memuat data' />
      }
    </>
  );
};

export default ContactPage;
