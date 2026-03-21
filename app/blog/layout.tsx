export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Mahir Ahmed — Blog"
        href="/blog/rss.xml"
      />
      {children}
    </>
  );
}
