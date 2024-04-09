import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script language="javascript" type="text/javascript" src="/p5.min.js" async></script>
        <script language="javascript" type="text/javascript" src="/grid_drawing.js" async></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://sharonchoong.github.io/svg-exportJS/svg-export.min.js"></script>
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
       
      </body>
    </Html>
  );
}
