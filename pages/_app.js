import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-with, initial-scale=1" />
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
