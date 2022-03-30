import "../styles/globals.css";
import {auth, onAuthStateChanged} from '../../firebase'
import { useState, useEffect  } from 'react';
import { useRouter } from "next/router";
import { AuthContext } from "../hooks/useAuth";


function MyApp({ Component, pageProps }) {

  
  const [user, setUser] = useState(null)
  const { push } = useRouter();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {      
        setUser(user);
      } else {
        setUser(null)
        push('/login')
      }
    });  
  }, [])

    return (
    <AuthContext.Provider value={{ user }}>
    <Component {...pageProps}  />;
    </AuthContext.Provider>
    )
 






}

export default MyApp;
