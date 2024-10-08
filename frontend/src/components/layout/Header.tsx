import React from 'react';
import ExpandableSearch from '@/components/ui/expandableSearch';
import { useExploitMode } from '@/hooks/useExploitMode';
import { FaCartShopping } from 'react-icons/fa6';
import { GiShop } from "react-icons/gi";
import useProductStore from '@/stores/useProductStore';


const Header: React.FC = () => {
    const { cartItems } = useProductStore();
    const renderIcon = useExploitMode(24);
    return (
        <header className="bg-[#2C3E50] text-white py-4 px-6 flex justify-between items-center">
            <div className='flex flex-row items-center gap-4'>
                <GiShop size={25} />
                <h1 className="text-2xl font-bold">TPAS E-Commerce Store</h1>
            </div>
            <div className='flex flex-row gap-8 mr-4 items-center'>
                <ExpandableSearch />
                <div className='flex items-center gap-2 rounded-3xl bg-white text-black py-2 px-4 font-semibold'>
                    <span>John Doe</span>
                    {renderIcon()}
                </div>
                <div className='relative'>
                    {
                        cartItems.length != 0 &&
                        <span className='absolute -top-2 -right-2 bg-slate-800 text-white flex items-center justify-center rounded-full px-[5px] text-sm'>{cartItems.length}</span>
                    }
                    <FaCartShopping size={30} />
                </div>
            </div>
        </header>
    );
};

export default Header;
