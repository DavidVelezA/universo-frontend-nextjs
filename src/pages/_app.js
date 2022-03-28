import '../styles/globals.css'
import { ContextAuthProvider } from "../context/AuthContext";
import Layout from '../pages/layout'

function MyApp({ Component, pageProps }) {
  return (
  <>
  <ContextAuthProvider>
    <Component {...pageProps} />
  </ContextAuthProvider>
</>)
}

export default MyApp
