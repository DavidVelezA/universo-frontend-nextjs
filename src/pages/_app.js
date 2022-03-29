import "../styles/globals.css";
import {auth, onAuthStateChanged} from '../../firebase'
import { useState, useEffect  } from 'react';
import { useRouter } from "next/router";


// router.push({
//   pathname: '/account/login',
//   query: { returnUrl: router.asPath }
// });





function MyApp({ Component, pageProps }) {

  const { push } = useRouter();


  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
       // const uid = user.uid;

        setUser(user);

        console.log(user)
  
        // console.log(user)
        // ...
      } else {
        setUser(null)
        push('/login')
        // User is signed out
        // ...
      }
    });
  
  }, [])


    return <Component {...pageProps} />;

 






}

export default MyApp;
