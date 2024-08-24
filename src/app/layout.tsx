import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Google translation demo',
    description: 'Google translation demo',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
            <Script src="/assets/translation.js" strategy="beforeInteractive" />
            <Script src="//translate.google.com/translate_a/element.js?cb=TranslateInit" strategy="afterInteractive" />
            <body className={inter.className}>
                <div id="google_translate_element"></div>
                {children}
            </body>
        </html>
    );
}
