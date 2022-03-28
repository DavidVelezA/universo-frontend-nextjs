import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // obtener datos de inputs
  const changeUser = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // registrar en firebase
  const registerUser = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
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

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="relative">
            <input
              className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-sky-500"
              type="email"
              placeholder="Email"
              name="email"
              onChange={changeUser}
            />
          </div>
          <div className="mt-8 content-center">
            <input
              className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-sky-500"
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeUser}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-sky-600 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-sky-800 shadow-lg cursor-pointer transition ease-in duration-300"
              onClick={registerUser}
            >
              Register
            </button>
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

export default Register;
