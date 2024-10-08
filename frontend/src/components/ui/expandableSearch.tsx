import Image from 'next/image';

import React, { useState } from 'react';
import useProductStore from '@/stores/useProductStore';


const ExpandableSearch: React.FC = () => {
  const {setSearchQuery, setSelectedCategory} = useProductStore();

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="text"
          className={`transition-width duration-300 ease-in-out pl-10 pr-4 py-2 rounded-full text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isFocused ? 'w-[600px]' : 'w-0'
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search..."
          onChange={(e) => {setSelectedCategory("None"); setSearchQuery(e.target.value);}}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image src={"/mat-icon-search.svg"} alt="search" width={16} height={16}/>
        </div>
      </div>
    </div>
  );
};

export default ExpandableSearch;
