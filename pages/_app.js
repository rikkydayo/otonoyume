import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../libs/gtags'


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
