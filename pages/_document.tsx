import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='w-full h-full bg-[#DDE7CE]'>
        <div className="mix-blend-darken bg-[url('/BACK.png')] bg-3x lg:bg-cover bg-top bg-no-repeat bg-[#DDE7CE] absolute min-w-full min-h-full blur -z-10"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
