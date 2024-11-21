import React from 'react';
import Link from 'next/link';


interface SideBarLinkButtonProps {
    href:string;
    label:string;
}

const SideBarLinkButton = ({href, label}:SideBarLinkButtonProps) => {
  return (
    <Link href={href}>
        <button className='flex items-center p-2 text-lg text-white hover:bg-blue-400 cursor-pointer'>
            {label}
        </button>

    </Link>
  )
}

export default SideBarLinkButton