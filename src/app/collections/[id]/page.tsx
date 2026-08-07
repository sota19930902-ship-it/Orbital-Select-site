'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { ProductCard } from '../../../components/ProductCard';
import { ORBIT_COLLECTIONS, PRODUCTS } from '../../../data/mockData';
import { Sparkles, ArrowLeft, Layers } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CollectionDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const collectionId = resolvedParams.id;

  const collection = ORBIT_COLLECTIONS.find((c) => c.id === collectionId) || ORBIT_COLLECTIONS[0];
  const collectionProducts = PRODUCTS.filter((p) => collection.productIds.includes(p.id));

  const [wishlist, setWishlist] = useState<any[]>([]);

  const handleToggleWishlist = (p: any) => {
    setWishlist((prev) => (prev.some((item) => item.id === p.id) ? prev.filter((item) => item.id !== p.id) : [...prev, p]));
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={wishlist.length} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        {/* Collection Hero */}
        <section
          style={{
            position: 'relative',
            height: '380px',
            backgroundColor: 'var(--bg-space)',
            color: '#FFFFFF',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {collection.heroImage ? (
            <img
              src={collection.heroImage}
              alt={collection.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.35,
              }}
            />
          ) : null}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,16,32,0.95) 40%, transparent 100%)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <Link href="/collections" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', fontSize: '0.82rem', marginBottom: '16px', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Orbit Collections 一覧へ戻る
            </Link>

            <span className="section-tag" style={{ textAlign: 'left', justifyContent: 'flex-start', color: 'var(--accent-gold)' }}>
              Orbit Collection
            </span>

            <h1 style={{ fontSize: '2.8rem', fontWeight: '500', color: '#FFFFFF', lineHeight: '1.2', marginBottom: '8px' }}>
              {collection.title} <span style={{ fontSize: '1.4rem', opacity: 0.8 }}>({collection.subtitle})</span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--accent-gold-light)', marginBottom: '16px', fontWeight: '300' }}>
              {collection.tagline}
            </p>

            <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.8)', maxWidth: '640px', lineHeight: '1.8' }}>
              {collection.description}
            </p>
          </div>
        </section>

        {/* Concept Section */}
        <section style={{ padding: '60px 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              LIFESTYLE CONCEPT
            </span>
            <blockquote style={{ fontSize: '1.25rem', fontWeight: '400', color: 'var(--text-main)', lineHeight: '1.7', fontStyle: 'italic' }}>
              "{collection.lifestyleConcept}"
            </blockquote>
          </div>
        </section>

        {/* Combined Multi-Brand Products Grid */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-sub)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Curated Items</span>
              <h2 className="section-title">このコレクションを構成するマルチブランド家具</h2>
              <p className="section-subtitle">
                ブランドの垣根を越え、理想の空間世界観を実現するために選定されたプロダクト。
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
              {collectionProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
