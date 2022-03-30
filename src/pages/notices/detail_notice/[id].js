import Layout from "../../layout";
import Image from "next/image";
import { getById } from "../../../services/notice.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const DetailNotice = () => {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const getNoticeById = async (id) => {
      try {
        const response = await getById(id);
        setNotice(response.data.notice);
      } catch (error) {
        console.log(error);
      }
    };

    getNoticeById(id);
  }, [id]);

  return (
    <Layout>
      <Link href="/notices/administer">
        <a
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  "
          type="button"
        >
          {" "}
          Atras
        </a>
      </Link>
      <h1 className="text-center text-4xl text-slate-700 font-mono">
        {notice && notice.title}
      </h1>
      <div className="flex justify-center mt-5">
        <Image
          src="/assets/default.png"
          alt="Vercel Logo"
          width={600}
          height={300}
        />
      </div>
      <span className=" mt-5 bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 ">
        {notice && notice.tags}
      </span>
      <span className="bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">
        Section: {notice && notice.section}
      </span>
      <span className="float-right bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
        Autor: {notice && notice.autor}
      </span>
      <p className="text-justify mt-5 mb-2">{notice && notice.description}</p>
    </Layout>
  );
};

export default DetailNotice;
