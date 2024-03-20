import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script language="javascript" type="text/javascript" src="/p5.min.js"></script>
        <script language="javascript" type="text/javascript" src="/grid_drawing.js"></script>
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
