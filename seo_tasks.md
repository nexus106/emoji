# SEO 向上タスクリスト

## 優先度: 高

### 1. 絵文字詳細ページの動的ルーティング
- [x] `app/emoji/[id]/page.tsx` の作成
- [x] メタタイトル・ディスクリプションの動的生成
- [x] 絵文字の意味、使い方、関連絵文字の表示
- [x] Open Graph / Twitter Card の実装
- [x] 構造化データ（JSON-LD）の実装

### 2. カテゴリページの動的ルーティング
- [x] `app/category/[slug]/page.tsx` の作成
- [x] カテゴリごとのメタデータ設定
- [x] カテゴリ内絵文字の一覧表示
- [x] ページネーション（必要に応じて）

### 3. XML サイトマップの自動生成
- [x] `app/sitemap.ts` の実装
- [x] 全絵文字ページを含む動的サイトマップ
- [x] カテゴリページ、トップページの追加

### 4. 構造化データ（JSON-LD）
- [x] 絵文字詳細ページ: `ImageObject` / `Article` schema
- [x] パンくずリスト: `BreadcrumbList` schema
- [x] サイト全体: `WebSite` schema

## 優先度: 中

### 5. メタデータの最適化
- [x] 共通メタデータコンポーネントの作成
- [x] トップページのメタデータ改善
- [x] 各ページの canonical URL 設定

### 6. 内部リンク構造の強化
- [x] 「関連する絵文字」セクションの実装
- [x] 「よく使われる絵文字」セクションの実装
- [x] カテゴリ間ナビゲーション
- [x] 検索結果からのリンク

### 7. robots.txt の設定
- [x] `app/robots.ts` の実装
- [x] 適切なクロール許可設定

## 優先度: 低

### 8. パフォーマンス最適化
- [x] ISR（Incremental Static Regeneration）の設定
- [x] 画像の最適化（Next.js Image コンポーネント使用）
- [x] ページプリフェッチ戦略の実装

### 9. 追加コンテンツ
- [x] トレンド絵文字ランキングページ
- [x] 「〇〇な時に使う絵文字」コレクションページ
- [x] 絵文字の使い方ガイド

## 技術的な考慮事項

### URL構造案
- トップ: `/`
- カテゴリ: `/category/[slug]` (例: `/category/people`)
- 絵文字詳細: `/emoji/[id]` (例: `/emoji/1f600`)

### メタタイトル形式案
- 絵文字詳細: `😀 グリニング・フェイス | 絵文字辞典`
- カテゴリ: `people カテゴリの絵文字一覧 | 絵文字辞典`

### 構造化データ例
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "name": "グリニング・フェイス",
  "description": "😀 楽しい、幸せな表情を表す絵文字",
  "contentUrl": "https://example.com/emoji/1f600"
}
```

### ファイル構成案
```
app/
├── emoji/
│   └── [id]/
│       └── page.tsx          # 絵文字詳細ページ
├── category/
│   └── [slug]/
│       └── page.tsx          # カテゴリページ
├── sitemap.ts                # サイトマップ
├── robots.ts                 # robots.txt
├── layout.tsx                # 共通レイアウト
└── page.tsx                  # トップページ

components/
├── metadata.tsx              # メタデータコンポーネント
└── structured-data.tsx       # 構造化データコンポーネント
```
