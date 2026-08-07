'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { VOYAGER_JOURNAL_ARTICLES } from '../../data/mockData';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';

export default function JournalIndexPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        <section style={{ backgroundColor: 'var(--bg-space)', color: '#FFFFFF', padding: '80px 0 60px', textAlign: 'center' }}>
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Editorial & Insights</span>
            <h1 className="section-title" style={{ color: '#FFFFFF', fontSize: '2.5rem' }}>
              Voyager Journal <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>(記事)</span>
            </h1>

            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '680px' }}>
              家具選びの哲学、ブランド探訪、空間づくりの知恵を深掘りするオルビタル・マガジン。
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
              {VOYAGER_JOURNAL_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-subtle)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="img-zoom-container" style={{ height: '220px', position: 'relative' }}>
                    <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        backgroundColor: 'rgba(11,16,32,0.85)',
                        color: 'var(--accent-gold)',
                        fontSize: '0.72rem',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-xs)',
                      }}
                    >
                      {article.category}
                    </span>
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {article.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {article.readTime}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.15rem', fontWeight: '500', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '8px' }}>
                      {article.title}
                    </h2>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.7', marginBottom: '20px' }}>
                      {article.summary}
                    </p>

                    <div style={{ marginTop: 'auto' }}>
                      <Link
                        href={`/journal/${article.id}`}
                        className="btn-outline"
                        style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.82rem', gap: '6px' }}
                      >
                        <span>記事を読む</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
