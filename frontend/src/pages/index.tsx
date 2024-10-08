import Layout from "@/components/Layout";
import ProductCatalog from "@/product/ProductCatalog";

export default function Home() {
  return (
    <Layout className= "min-h-full h-screen">
      <ProductCatalog />
    </Layout>
  );
}
