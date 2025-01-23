import React from 'react';
import Link from 'next/link';


interface SideBarLinkButtonProps {
    href:string;
    label:string;
    onClick?:()=> void;
    activeClass?:string;
}

const SideBarLinkButton = ({href, label, onClick, activeClass}:SideBarLinkButtonProps) => {
  return (
    <Link href={href}>
        <button className={`flex items-center p-2 text-lg text-white hover:bg-blue-400 cursor-pointer rounded-lg w-full ${activeClass} `}
        onClick={onClick}>
            {label}
        </button>

    </Link>
  )
}

export default SideBarLinkButton