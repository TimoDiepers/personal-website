import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Timo Diepers',
  description: "Overview of Timo Diepers' publications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const key='theme-preference';const stored=localStorage.getItem(key);const systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;const theme=stored==='dark'||stored==='light'?stored:(systemDark?'dark':'light');document.documentElement.classList.toggle('dark',theme==='dark');}catch(_e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
