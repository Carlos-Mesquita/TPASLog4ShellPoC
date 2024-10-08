import React, { useEffect, useState } from 'react';
import useProductStore from '@/stores/useProductStore';
import categories from '@/product/Categories';


const Navbar: React.FC = () => {
    const { selectedCategory, setSelectedCategory } = useProductStore();
    const [ lastCategory, setLastCategory ] = useState<string>("None");

    const handleCategoryChange = (category: string) => {
        if (category != lastCategory) {
            setSelectedCategory(category);
        }else{
            setSelectedCategory("None");
        }
    }

    useEffect(()=> {
        setLastCategory(selectedCategory);
    }, [selectedCategory])


    return (
        <nav className="w-64 bg-gray-900 h-full overflow-y-auto border-r border-gray-700 custom-scrollbar">
            <div className="py-4">
                <h2 className="text-xl font-semibold mb-4 px-4 text-white">Products</h2>
                <ul className="space-y-1">
                    {Object.entries(categories).map(([category, { icon: IconComponent, label }]) => (
                        <li key={category}>
                            <button
                                onClick={() => handleCategoryChange(category)}
                                className={`w-full text-left px-4 py-2 transition-colors duration-150 ease-in-out flex items-center ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800'
                                }`}
                            >
                                <IconComponent className={`mr-3 h-5 w-5 ${
                                    selectedCategory === category ? 'text-white' : 'text-gray-400'
                                }`} />
                                <span className="text-sm font-medium">{label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;