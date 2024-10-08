import { GiDelicatePerfume, GiLargeDress, GiSleevelessTop, GiSmartphone, GiRunningShoe } from "react-icons/gi";
import { LuArmchair } from "react-icons/lu";
import { FaLaptop, FaGem, FaMobileAlt } from "react-icons/fa";
import { FaCartShopping, FaUtensils, FaShirt, FaCar, FaTabletScreenButton, FaDroplet, FaDumbbell } from "react-icons/fa6";
import { PiHighHeelFill, PiWatchFill, PiHandbagFill } from "react-icons/pi";
import { BsSunglasses } from "react-icons/bs";
import { MdDirectionsBike } from "react-icons/md";
import { IoSparklesSharp } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";

const categories = {
    "beauty": {
        icon: IoSparklesSharp,
        label: "Beauty"
    },
    "fragrances": {
        icon: GiDelicatePerfume,
        label: "Fragrances"
    },
    "furniture": {
        icon: LuArmchair,
        label: "Furniture"
    },
    "groceries": {
        icon: FaCartShopping,
        label: "Groceries"
    },
    "home-decoration": {
        icon: IoIosHome,
        label: "Home Decoration"
    },
    "kitchen-accessories": {
        icon: FaUtensils,
        label: "Kitchen Accessories"
    },
    "laptops": {
        icon: FaLaptop,
        label: "Laptops"
    },
    "mens-shirts": {
        icon: FaShirt,
        label: "Men's Shirts"
    },
    "mens-shoes": {
        icon: GiRunningShoe,
        label: "Men's Shoes"
    },
    "mens-watches": {
        icon: PiWatchFill,
        label: "Men's Watches"
    },
    "mobile-accessories": {
        icon: FaMobileAlt,
        label: "Mobile Accessories"
    },
    "motorcycle": {
        icon: MdDirectionsBike,
        label: "Motorcycle"
    },
    "skin-care": {
        icon: FaDroplet,
        label: "Skin Care"
    },
    "smartphones": {
        icon: GiSmartphone,
        label: "Smartphones"
    },
    "sports-accessories": {
        icon: FaDumbbell,
        label: "Sports Accessories"
    },
    "sunglasses": {
        icon: BsSunglasses,
        label: "Sunglasses"
    },
    "tablets": {
        icon: FaTabletScreenButton,
        label: "Tablets"
    },
    "tops": {
        icon: GiSleevelessTop,
        label: "Tops"
    },
    "vehicle": {
        icon: FaCar,
        label: "Vehicle"
    },
    "womens-bags": {
        icon: PiHandbagFill,
        label: "Women's Bags"
    },
    "womens-dresses": {
        icon: GiLargeDress,
        label: "Women's Dresses"
    },
    "womens-jewellery": {
        icon: FaGem,
        label: "Women's Jewellery"
    },
    "womens-shoes": {
        icon: PiHighHeelFill,
        label: "Women's Shoes"
    },
    "womens-watches": {
        icon: PiWatchFill,
        label: "Women's Watches"
    }
};

export default categories;
