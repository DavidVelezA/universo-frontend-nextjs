import Image from "next/image";
import Link from "next/link";
import Alert from "../components/alerts/alert";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../firebase";

const Login = () => {
  const { push } = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showNotification, setshowNotification] = useState(false);
  const [message, setMessage] = useState("");

  // obtener datos de inputs
  const changeUser = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // registrar en firebase
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setshowNotification(false);
      push("/notices/administer");
    } catch ({ message }) {

      console.log(message)

      if (message === "Firebase: Error (auth/wrong-password).") {
        setMessage("Password Incorrect");
        setshowNotification(true);
      }
      if (message == "Firebase: Error (auth/user-not-found).") {
        setMessage("Auth/user-not-found");
        setshowNotification(true);
      }
    }
  };

  return (
    <div className="fondo relative min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
        <div className="text-right text-cyan-400">
          <Link href="/login">
            <a className="p-5"> Sing up </a>
          </Link>
          <Link href="/register">
            <a> Registration </a>
          </Link>
        </div>
        {showNotification && <Alert message={message} />}

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="relative">
            <input
              className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-sky-500"
              name="email"
              type="email"
              placeholder="Email"
              onChange={changeUser}
            />
          </div>
          <div className="mt-8 content-center">
            <input
              className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-sky-500"
              name="password"
              type="password"
              placeholder="Password"
              onChange={changeUser}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-sky-600 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-sky-800 shadow-lg cursor-pointer transition ease-in duration-300"
              onClick={loginUser}
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm ">
              <a
                href="#"
                className="font-medium text-sky-500	 hover:text-sky-300	"
              >
                Recover your password
              </a>
            </div>
          </div>
          <div className="grid grid-flow-col gap-12">
            <div className="row-span-3 mt-10 grid-flow-col-4 gap-10">
              <p className="items-start justify-center  text-md text-gray-500">
                <span>Sing in with</span>
              </p>
            </div>
            <div className="row-span-3 mt-10 grid-flow-col-2 ml-12  ">
              <Image
                src="/assets/facebook.svg"
                alt="Vercel Logo"
                width={60}
                height={30}
              />
              <Image
                src="/assets/vk.svg"
                alt="Vercel Logo"
                width={60}
                height={30}
              />
              <Image
                src="/assets/twitter.svg"
                alt="Vercel Logo"
                width={60}
                height={30}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
