import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallbackTitle?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackTitle = 'Glow Lab NG',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3EBDD] via-[#EDE4D3] to-[#D8C9AF] p-6 text-center text-[#2B2118] ${className}`}
      >
        <Sparkles className="mb-2 h-6 w-6 text-[#7A4B2E]" aria-hidden="true" />
        <span className="font-display text-sm font-semibold">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
