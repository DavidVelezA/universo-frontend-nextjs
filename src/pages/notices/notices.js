import Layout from "../layout";
import { getAll } from "../../services/notice.service";
import { useEffect, useState } from "react";
import Link from "next/link";
const Notices = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState();
  const [totalDocs, setTotalDocs] = useState();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resp = await getAll(page);
      if (resp) {
        setNotices(resp.data.notices);
        setTotalPage(resp.data.totalPages);
        setTotalDocs(resp.data.totalDocs);
      }
    };
    getData();
  }, [page]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Layout>
      <ul className="divide-y divide-gray-100 bg-white shadow">
        {" "}
        {notices.length > 0 &&
          notices.map((notice) => (
            <li className="p-3 " key={notice._id}>
              <div className="container">
                <h1 className="text-center text-2xl text-slate-700 font-mono">
                  {notice.title}
                </h1>
                <span className="bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">
                  Section: {notice.section}
                </span>
                <span className="float-right bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                  Autor: {notice.autor}
                </span>
                <div className="clear-left"></div>
                <p className="text-justify mt-3 mb-2">{notice.summary}</p>
                <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  {notice.tags}
                </span>
                <Link href={`/notices/detail_notice/${notice._id}`}>
                  <a className="float-right mt-5 bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full">
                    {" "}
                    Leer Mas{" "}
                  </a>
                </Link>
                <div className="clear-right"></div>
              </div>
            </li>
          ))}
      </ul>

      <div className="flex flex-col items-center float-right mt-5">
        <span className="text-sm text-gray-700 ">
          Pag. <span className="font-semibold text-gray-900 ">{page}</span> de
          <span className="font-semibold text-gray-900 ">
            {" "}
            {totalPages}{" "}
          </span>{" "}
          Total noticias
          <span className="font-semibold text-gray-900 "> {totalDocs}</span>
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={previousPage}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"></path>
            </svg>
            Prev
          </button>
          <button
            onClick={nextPage}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Notices;
