'use client';

import React from 'react';
import { Sparkles, ArrowRight, Home, Utensils, Laptop, Moon } from 'lucide-react';

interface RoomNavigationProps {
  onSelectRoom: (roomId: string) => void;
}

export const RoomNavigation: React.FC<RoomNavigationProps> = ({ onSelectRoom }) => {
  const rooms = [
    {
      id: 'living',
      nameEn: 'LIVING ROOM',
      nameJp: 'リビング空間',
      desc: '家族が集い、心からくつろぐ上質な静寂とやすらぎの空間。',
      items: 'ソファ・ローテーブル・AVボード・シェルフ',
      countText: '40+ アイテム',
      icon: Home,
      accentColor: '#C5A46D',
      bgGradient: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
    },
    {
      id: 'dining',
      nameEn: 'DINING ROOM',
      nameJp: 'ダイニング空間',
      desc: '名作無垢テーブルと光の彫刻が、毎日の食卓を特別に仕立てる。',
      items: 'ダイニングテーブル・チェア・ペンダント照明',
      countText: '80+ アイテム',
      icon: Utensils,
      accentColor: '#C5A46D',
      bgGradient: 'linear-gradient(135deg, rgba(41, 37, 36, 0.9) 0%, rgba(28, 25, 23, 0.95) 100%)',
    },
    {
      id: 'study',
      nameEn: 'WORK SPACE',
      nameJp: 'ワークスペース・書斎',
      desc: '無駄を削ぎ落とした洗練の機能美。集中と創造力を研ぎ澄ます。',
      items: 'デスク・オフィスチェア・サイドキャビネット',
      countText: '30+ アイテム',
      icon: Laptop,
      accentColor: '#C5A46D',
      bgGradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.95) 100%)',
    },
    {
      id: 'bedroom',
      nameEn: 'BEDROOM',
      nameJp: 'ベッドルーム・寝室',
      desc: '静謐な陰影と木の温もりに包まれる、最上級のリラクゼーション。',
      items: 'ベッドフレーム・ナイトテーブル・間接照明',
      countText: '15+ アイテム',
      icon: Moon,
      accentColor: '#C5A46D',
      bgGradient: 'linear-gradient(135deg, rgba(23, 23, 23, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
    },
  ];

  return (
    <section
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--bg-space)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 164, 109, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: '700',
              color: 'var(--accent-gold)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={14} />
            <span>Scene & Atmosphere</span>
          </div>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#FFFFFF',
              margin: '0 0 12px 0',
              letterSpacing: '-0.01em',
            }}
          >
            空間・シーン別から探す
          </h2>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            お部屋の用途やインテリア構想に合わせて、統一感のあるコーディネート空間をご提案
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {rooms.map((room) => {
            const Icon = room.icon;

            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                style={{
                  background: room.bgGradient,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(197, 164, 109, 0.25)',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(197, 164, 109, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.25)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
                }}
              >
                {/* Top Icon & Count */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(197, 164, 109, 0.15)',
                      border: '1px solid rgba(197, 164, 109, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} color="var(--accent-gold)" />
                  </div>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--accent-gold)',
                      backgroundColor: 'rgba(197, 164, 109, 0.12)',
                      border: '1px solid rgba(197, 164, 109, 0.25)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: '600',
                    }}
                  >
                    {room.countText}
                  </span>
                </div>

                {/* Title */}
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      letterSpacing: '0.12em',
                      color: 'var(--accent-gold)',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    {room.nameEn}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      margin: 0,
                    }}
                  >
                    {room.nameJp}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: '1.65',
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {room.desc}
                </p>

                {/* Curated items note */}
                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {room.items}
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-gold)',
                      color: '#0B1020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
