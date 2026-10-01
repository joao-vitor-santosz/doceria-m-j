import { CakeSlice } from "lucide-react";

type ProductImageProps = {
  src?: string;
  alt: string;
  className: string;
};

export function ProductImage({ src, alt, className }: ProductImageProps) {
  if (src) {
    return <img className={`object-cover ${className}`} src={src} alt={alt} />;
  }

  return (
    <div className={`grid place-items-center bg-brand-navy text-brand-gold ${className}`} aria-label={alt}>
      <CakeSlice size={42} aria-hidden="true" />
    </div>
  );
}
