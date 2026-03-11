import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import SpotlightSection from "@/components/SpotlightSection";
import ShopByCategory from "@/components/ShopByCategory";
import FeaturedTabs from "@/components/FeaturedTabs";
import CategorySpotlight from "@/components/CategorySpotlight";
import BrandMarquee from "@/components/BrandMarquee";
import ProductAccordion from "@/components/ProductAccordion";
import Techprint from "@/components/TechBlueprints"

import Showcase from "@/components/ShowcaseStrip";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

export default function Home() {
  const [data, setData] = useState({
    printers: [],
    accessories: [],
    all: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const all = prodRes.data.filter(p => !p.name.toLowerCase().includes('laptop') && !p.name.toLowerCase().includes('macbook') && !p.name.toLowerCase().includes('notebook'));

          const printers = all.filter(p =>
            p.name.toLowerCase().includes('printer') ||
            p.name.toLowerCase().includes('laserjet') ||
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p =>
            p.name.toLowerCase().includes('ink') ||
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          setData({
            all,
            printers,
            accessories,
            laserPrinters: all.filter(p => p.name.toLowerCase().includes('laserjet') || p.name.toLowerCase().includes('laser')),
            categories: catRes.data.filter(c => !c.name.toLowerCase().includes('laptop')),
            brands: brandRes.data,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-sans overflow-x-hidden text-slate-900">
      <SEO
        title="Printilofy | Premium Printing Solutions"
        description="Shop genuine printers, ink, and toner in Pasadena, CA. Premium business printing solutions with nationwide shipping."
        keywords="Buy HP Printers Online, Genuine HP Ink and Toner, HP LaserJet, HP OfficeJet, Printer Accessories, Business Printing Solutions, Pasadena Tech Store"
      />
      {/* 1. HERO */}
      <div className="relative">
        <Hero products={data.all} />
        <Showcase />
      </div>
      {/* 3. FEATURED PRODUCTS (TABS) - Moved here after Category */}
      <FeaturedTabs
        printers={data.printers}
        accessories={data.accessories}
        loading={data.loading}
      />

      <CategorySpotlight
        categorySlug="laser-printers"
        title="Enterprise laser systems"
        bannerImage="/banner/spotlight-laser.jpg"
        imagePosition="left"
      />

      {/* 2. CATEGORY SECTION */}
      <div className="py-10 md:py-0">
        <ShopByCategory categories={data.categories} />
      </div>


      <CategorySpotlight
        categorySlug="inkjet-printers"
        title="Creative color solutions"
        bannerImage="/banner/spotlight-inkjet.jpg"
        imagePosition="right"
      />





      {/* 4. NEW ARRIVALS */}
      <SpotlightSection
        newArrivals={data.all}
        topRated={data.all}
        popular={data.all}
        loading={data.loading}
      />
      <BrandMarquee />



    </div>
  );
}
