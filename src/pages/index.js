import Head from 'next/head'
import Form from '../components/form'

export default function Home() {
  return (
    <div>
      <Head>
        <link
          rel="preload"
          href="/fonts/font.woff"
          as="font"
          crossOrigin=""
        />

        <title>PDF Merge</title>
        <meta name="description" content="pdf merge for cs50" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="bg-blue-embie h-screen flex flex-col items-center font-embie py-20 px-10">
        <h1 className="font-bold tracking-tight text-8xl mb-5 text-white break-words">Bienvenue</h1>
        <h3 className="text-2xl tracking-wider text-white">PDF merge</h3>
        <Form />
      </main>
    </div>
  )
}
