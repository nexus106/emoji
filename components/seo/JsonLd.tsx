interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Render JSON-LD structured data script tag
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
