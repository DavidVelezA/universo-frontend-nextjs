import { useEffect, useState } from "react";
import { getAll, getById } from "../../services/notice.service";
import RegisterNotice from "../forms/registerNotice";

const NoticesAdmin = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState();
  const [totalDocs, setTotalDocs] = useState();
  const [notices, setNotices] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [dataById, setDataById] = useState({
    title: "",
    section: "",
    summary: "",
    description: "",
    tag: "",
    autor: "",
  });
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


  const getNoticeById = async (id) => {

      try {
          const response = await getById(id);
          setDataById(response.data); 
          setFormActive(true);
        
    } catch (error) {
        console.log(error)        
    }
  }


  return (
    <>
      <h1 className="text-center text-4xl mb-5">Administrador de noticias</h1>

      {formActive ? (
        <button
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full float-right mb-3"
          onClick={() => {
            setFormActive(false);
            setDataById(null);
          }}
        >
          Close
        </button>
      ) : (
        <button
          className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded-full float-right mb-3"
          onClick={() => {
            setFormActive(true);
          }}
        >
          New
        </button>
      )}

      {formActive ? (
        <RegisterNotice setFormActive={setFormActive} dataById={dataById} />
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg clear-right">
            <table className="w-full text-sm text-left text-gray-500 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Section
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Autor
                  </th>

                  <th scope="col" className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {notices.length > 0 &&
                  notices.map((notice) => (
                    <tr className="border-b odd:bg-white " key={notice._id}>
                      <th
                        scope="row"
                        className="px-4 py-4 font-medium text-gray-900"
                      >
                        {notice.title}
                      </th>
                      <td className="px-6 py-4">{notice.section}</td>
                      <td className="px-6 py-4">{notice.tags}</td>
                      <td className="px-6 py-4">{notice.autor}</td>
                      <td className="px-6 py-4">
                        <button className="bg-transparent hover:bg-yellow-200	text-neutral-600 font-semibold hover:text-dark py-2 px-4 border border-yellow-200 hover:border-transparent rounded"
                        onClick={() => {getNoticeById(notice._id)}}>
                          Edit
                        </button>
                        <button className="ml-3 bg-transparent hover:bg-red-200	text-neutral-600 font-semibold hover:text-dark py-2 px-4 border border-red-200 hover:border-transparent rounded">
                          Delete
                        </button>
                        <button className="ml-3 bg-transparent hover:bg-blue-200	text-neutral-600 font-semibold hover:text-dark py-2 px-4 border border-blue-200 hover:border-transparent rounded">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center float-right mt-5">
            <span className="text-sm text-gray-700 ">
              Pag. <span className="font-semibold text-gray-900 ">{page}</span>{" "}
              de
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
        </>
      )}
    </>
  );
};

export default NoticesAdmin;
