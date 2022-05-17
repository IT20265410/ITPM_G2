import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';


export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Customers',
        path: '/customer-list',
        icon: <ImIcons.ImManWoman />,
        cName: 'nav-text'
    },
    {
        title: 'Vehicles',
        path: '/viewvehicle',
        icon: <AiIcons.AiFillCar />,
        cName: 'nav-text'
    },
    {
        title: 'Staff',
        path: '/viewp',
        icon: <ImIcons.ImUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Offer',
        path: '/viewOffer',
        icon: <AiIcons.AiFillGift />,
        cName: 'nav-text'
    },
    {
        title: 'Rent',
        path: '/viewrent',
        icon: <FaIcons.FaXRay />,
        cName: 'nav-text'
    },
    {
        title: 'Team',
        path: '/viewm',
        icon: <ImIcons.ImUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Contact Us',
        path: '/contact-list',
        icon: <AiIcons.AiFillContacts />,
        cName: 'nav-text'
    },
    {
        title: 'About Us',
        path: '/viewa',
        icon: <FaIcons.FaAmbulance />,
        cName: 'nav-text'
    },
    {
        title: 'FAQ',
        path: '/viewFaq',
        icon: <AiIcons.AiOutlineDollarCircle />,
        cName: 'nav-text'
    }
];