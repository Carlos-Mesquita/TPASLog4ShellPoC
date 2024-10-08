import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/interfaces/Product';
import useProductStore from '@/stores/useProductStore';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface UseProductsProps {
  limit?: number;
  initialSkip?: number;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  skip: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

export const useProducts = ({ limit = 8, initialSkip = 0 }: UseProductsProps = {}): UseProductsReturn => {
  const { selectedCategory, searchQuery } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(initialSkip);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const nextPage = () => setSkip((prev: number) => prev + limit);
  const prevPage = () => setSkip((prev: number) => Math.max(0, prev - limit));
  const setPage = (page: number) => setSkip((page - 1) * limit);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const baseURL = selectedCategory == "None" ? BASE_URL : `${BASE_URL}/category/${selectedCategory}`;
      const url = selectedCategory == "None" ? 
        (
          searchQuery
          ? `${baseURL}/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
          : `${baseURL}?limit=${limit}&skip=${skip}`
        ) :
        baseURL
      ;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data: ProductsResponse = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [limit, skip, searchQuery, selectedCategory]);

  useEffect(()=> {
    setPage(0);
    setSkip(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedCategory, searchQuery]);

  useEffect(() => {
    setSkip(0);
  }, [searchQuery])

  return {
    products,
    loading,
    skip,
    nextPage,
    prevPage,
    setPage,
    totalProducts,
    currentPage: Math.floor(skip / limit) + 1,
    totalPages: Math.ceil(totalProducts / limit),
  };
};