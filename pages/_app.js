import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import usePageView from '../src/hooks/usePageView'


function MyApp({ Component, pageProps }) {
  usePageView() 
  return <Component {...pageProps} />
}

export default MyApp
