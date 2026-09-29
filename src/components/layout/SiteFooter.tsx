type SiteFooterProps = { message: string };

export function SiteFooter({ message }: SiteFooterProps) {
  return (
    <footer className="mt-10 text-center text-xs font-bold tracking-wide text-brand-gold-dark sm:mt-14 sm:text-sm">
      {message}
    </footer>
  );
}
