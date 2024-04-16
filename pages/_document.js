import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" async></script>
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
       
      </body>
    </Html>
  );
}
