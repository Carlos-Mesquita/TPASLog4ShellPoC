import React from 'react';

import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { X, Star, Truck, RotateCcw, Package } from 'lucide-react';
import { Product } from '@/interfaces/Product';
import BlurEffectImage from '@/components/ui/blurEffectImage';

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, closeModal, product }) => {
  if (!product) return null;

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={closeModal} className="relative z-50">
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="relative">
                  <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <div className="grid grid-cols-2 gap-8 p-6">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <div className="flex space-x-2 overflow-x-auto justify-center">
                        {product.images.slice(1).map((image, index) => (
                          <div key={`image-container-${index}`} className='w-[64px] h-[64px] flex justify-center items-center overflow-hidden relative'>
                            <BlurEffectImage src={image} alt={`${product.title} - ${index + 1}`} width={64} height={64} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                      <div className="flex items-center mb-4">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="text-lg font-medium">{product.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews.length} reviews)</span>
                      </div>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.discountPercentage > 0 && (
                          <span className="ml-2 text-sm font-medium text-green-600">
                            {product.discountPercentage}% off
                          </span>
                        )}
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Brand:</strong> {product.brand}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>SKU:</strong> {product.sku}</p>
                        <p><strong>Stock:</strong> {product.stock} units</p>
                        <p><strong>Weight:</strong> {product.weight} kg</p>
                        <p><strong>Dimensions:</strong> {product.dimensions.width}W x {product.dimensions.height}H x {product.dimensions.depth}D cm</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 text-black">
                    <div className="flex space-x-4 text-sm justify-center">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{product.shippingInformation}</span>
                      </div>
                      <div className="flex items-center">
                        <RotateCcw className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{product.returnPolicy}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Min. Order: {product.minimumOrderQuantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;