import Head from "next/head"
import Form from "../components/form"

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="preload" href="/fonts/font.woff" as="font" crossOrigin="" />

        <title>PDF Merge</title>
        <meta name="description" content="pdf merge for cs50" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="h-screen min-h-screen m-0 bg-blue-embie flex flex-col flex-1 items-center font-embie py-20 px-10">
        <h1 className="font-bold tracking-tight text-4xl sm:text-8xl mb-5 text-white break-words break-all">
          Bienvenue
        </h1>
        <h3 className="text-xl sm:text-2xl tracking-wider text-white">PDF merge</h3>
        <Form />
      </main>
    </div>
  )
}
