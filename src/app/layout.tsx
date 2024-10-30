import style from './page.module.scss'
import "./globals.css"
import { Inter } from 'next/font/google'

const roboto = Inter({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (


    <html lang="en" className={roboto.className}>
      <body>
        <header>
          <div className={style.headerContainer}>
            <h1 className={style.title}>Crypto Opportunities Dashboard</h1>
          </div>
        </header>
        {children}
      </body>
    </html>

  );
}
