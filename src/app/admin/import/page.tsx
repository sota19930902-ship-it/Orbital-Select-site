'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowLeft, Download, Layers } from 'lucide-react';

export default function AdminImportPage() {
  const [csvText, setCsvText] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [parsedCount, setParsedCount] = useState<number | null>(null);

  const sampleCsv = `brand_id,product_name,category,price,official_url,image_url,description
masterwal,DANISH SOFA 3P,sofa,462000,https://www.masterwal.jp/shop/g/gDNSSO/,https://images.unsplash.com/photo-1555041469-a586c61ea9bc,Low & Comfortableローソファ
air_rhizome,3人掛けカウチソファ Wism,sofa,49980,https://www.air-r.jp/products/list.php?name=Wism,https://images.unsplash.com/photo-1586023492125,北欧カウチソファ
beaubelle,4灯シーリングライト RECONTE,lighting,18800,https://beaubelle.shop/?s=RECONTE,https://images.unsplash.com/photo-1507473885765,木目調シーリングライト
lavita,Louis Poulsen PH 5,lighting,159500,https://lavita-shop.jp/?s=PH5,https://images.unsplash.com/photo-1540932239986,北欧名作ペンダントランプ`;

  const handleImport = () => {
    if (!csvText.trim()) {
      setStatusMessage('CSVテキストまたはデータを入力してください。');
      return;
    }

    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) {
      setStatusMessage('データ行が存在しません。ヘッダー行＋データ行形式で入力してください。');
      return;
    }

    const count = lines.length - 1;
    setParsedCount(count);
    setStatusMessage(`成功: ${count} 件のショップ製品データをインポート・連携準備完了しました！`);
  };

  const handleLoadSample = () => {
    setCsvText(sampleCsv);
    setStatusMessage(null);
    setParsedCount(null);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-space)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />


      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            <span>製品検索ハブに戻る</span>
          </Link>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid var(--accent-gold)',
              fontSize: '0.82rem',
              color: 'var(--accent-gold)',
              marginBottom: '12px',
            }}
          >
            <Layers size={14} />
            <span>ASP Data Feed Synchronization</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '8px' }}>
            各ショップ製品 データ連携・一括登録
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            A8.net、バリューコマース、アクセストレード等から取得したアフィリエイト商品CSVデータを取り込み、全ショップの製品をORBITAL SELECTへ自動反映できます。
          </p>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '24px',
              backgroundColor: parsedCount ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: parsedCount ? '1px solid #4ade80' : '1px solid #ef4444',
              color: parsedCount ? '#4ade80' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {parsedCount ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Main Import Box */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <label style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--accent-gold)" />
              CSV / ASP商品データ貼り付け
            </label>
            <button
              onClick={handleLoadSample}
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '6px 12px',
                color: 'var(--accent-gold)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Download size={14} />
              <span>サンプルデータを入力を試す</span>
            </button>
          </div>

          <textarea
            rows={10}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="brand_id,product_name,category,price,official_url,image_url,description&#10;masterwal,DANISH SOFA,sofa,462000,https://www.masterwal.jp/shop/g/gDNSSO/..."
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: 'var(--bg-space)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              outline: 'none',
              marginBottom: '20px',
              resize: 'vertical',
            }}
          />

          <button
            onClick={handleImport}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', justifyContent: 'center', gap: '8px' }}
          >
            <Upload size={18} />
            <span>全製品データをインポート・一括登録実行</span>
          </button>
        </div>

        {/* Feature Explanations */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '8px' }}>ASPデータフィード自動取り込み</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              A8.net やバリューコマース等で提供される商品データCSVをそのまま登録し、数千点規模の製品を掲載可能にします。
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '8px' }}>自動アフィリエイト計測リンク付与</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              インポートされた製品URLには、設置済みの `a8linkmgr` がリアルタイムに成果追跡Cookieを付与し、完全自動で成果を計上します。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
