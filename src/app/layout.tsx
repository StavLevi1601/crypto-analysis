import style from './page.module.scss'
import "./globals.css"

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (


    <html lang="en">
      <body className={style.bodyPage}>
        {children}
      </body>
    </html>

  );
}
