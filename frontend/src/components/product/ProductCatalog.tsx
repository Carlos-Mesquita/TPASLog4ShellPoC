import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import GridLoader from "react-spinners/GridLoader";

import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/interfaces/Product';
import ProductModal from '@/product/ProductModal';
import categories from "@/product/Categories";
import BlurEffectImage from "@/components/ui/blurEffectImage";
import { cn } from '@/lib/utils';
import useProductStore from '@/stores/useProductStore';

const ProductCatalog: React.FC = () => {
  const {
    products,
    loading,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
  } = useProducts();

  const { cartItems, toggleCartItem } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setShowSpinner(true);
    } else {
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {showSpinner ? (
        <div className='flex items-center justify-center w-full h-full'>
          <GridLoader color='#F1FAEE' size={30} />
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 mx-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="flex items-center">
                  <div className='relative w-full h-[150px] flex justify-center items-center'>
                    <BlurEffectImage src={product.images[0]} alt={product.title} />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
                  <Badge className="mb-2">{categories[product.category as keyof typeof categories].label}</Badge>
                  <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-between gap-3">
                  <Button className="w-1/2" onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}>
                    View Details
                  </Button>
                  <Button className={cn(
                    "w-1/2 transition-colors",
                    cartItems.includes(product.id) && "bg-blue-500 text-white hover:bg-blue-600",
                  )}
                    onClick={() => toggleCartItem(product.id)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> {!cartItems.includes(product.id) ? "Add to Cart" : "Added to cart"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <Button onClick={prevPage} disabled={currentPage === 1}>Previous</Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button onClick={nextPage} disabled={currentPage === totalPages}>Next</Button>
          </div>
          <ProductModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            product={selectedProduct}
          />
        </>
      )}
    </>
  );
};

export default ProductCatalog;
