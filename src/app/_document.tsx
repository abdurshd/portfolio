import React from "react";
import Document, { Html, Head/*  Body */, Main, NextScript } from "next/document";
import { getCssText } from "../../stitches.config";
import { GA_TRACKING_ID } from "../lib/gtag";
import Link from "next/link";

export default class extends Document {
  

  render() {
    const lang = this.props.__NEXT_DATA__.props.pageProps?.post?.lang;

    return (
      <Html lang={lang ? lang : "en-US"}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="Abdurashid Abarov" name="author" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta name="theme-color" content="#08070b" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />

          <Link rel="icon" href="/favicon.png" type="image/png" />
          <Link rel="alternate" type="application/rss+xml" href="https://abdurashid.tech/rss/feed.xml"/>
          <Link rel="alternate" type="application/atom+xml" href="https://abdurashid.tech/rss/atom.xml" />
          <Link rel="alternate" type="application/feed+json" href="https://abdurashid.tech/rss/feed.json" />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}