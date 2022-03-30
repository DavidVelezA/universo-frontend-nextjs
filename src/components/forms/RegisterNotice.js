import { useState, useEffect } from "react";
import { save, update } from "../../services/notice.service";
import { swalAlert } from "../alerts/swal_alert";

const RegisterNotice = ({
  setFormActive,
  dataById,
  setRefresh,
  refresh,
  setDataById,
}) => {
  useEffect(() => {
    if (dataById && dataById.notice) {
      setDataForm(dataById.notice);
    }
  }, []);

  const [dataForm, setDataForm] = useState({
    title: "",
    section: "",
    summary: "",
    description: "",
    tag: "",
    autor: "",
  });

  const changeNotice = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  // registrar
  const registerNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await save(dataForm);

      if (response && response.data.status == "info") {
        swalAlert(
          response.data.status,
          "Campos vacios",
          response.data.message,
          () => setRefresh(!refresh)
        );
      } else {
        swalAlert(response.data.status, "Correcto", response.data.message, () =>
          setRefresh(!refresh)
        );
        setFormActive(false);
      }
      setDataById(false);
    } catch (error) {
      console.log(error);
    }
  };

  //actualizar

  const updateNotice = async (e) => {
    e.preventDefault();
    setDataForm(dataById.notice);
    try {
      const response = await update(dataById.notice._id, dataForm);

      if (response && response.data.status == "info") {
        swalAlert(
          response.data.status,
          "Campos vacios",
          response.data.message,
          () => setRefresh(!refresh)
        );
        s;
      } else {
        swalAlert(response.data.status, "Correcto", response.data.message, () =>
          setRefresh(!refresh)
        );
        setFormActive(false);
      }
      setDataById(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative  flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">
      <div className="max-w-xl w-full space-y-8 p-10 bg-white rounded-xl z-10 ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                type="text"
                placeholder="Title"
                onChange={changeNotice}
                defaultValue={dataById ? dataById.notice.title : ""}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Section
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="section"
                type="text"
                placeholder="Section"
                onChange={changeNotice}
                defaultValue={dataById ? dataById.notice.section : ""}
              />
            </div>
          </div>

          <div className="mb-2"></div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Summary
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="summary"
              type="text"
              placeholder="Summary"
              rows={3}
              onChange={changeNotice}
              defaultValue={dataById ? dataById.notice.summary : ""}
            ></textarea>
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              type="text"
              placeholder="Description"
              rows={5}
              onChange={changeNotice}
              defaultValue={dataById ? dataById.notice.description : ""}
            ></textarea>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tags
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="tags"
                type="text"
                placeholder="tag1, tag2, tag3"
                onChange={changeNotice}
                defaultValue={dataById ? dataById.notice.tags : ""}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Autor
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="autor"
                type="text"
                placeholder="Autor"
                onChange={changeNotice}
                defaultValue={dataById ? dataById.notice.autor : ""}
              />
            </div>
          </div>
          <div className="flex items-center justify-between float-right">
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  "
              type="button"
              onClick={dataById ? updateNotice : registerNotice}
            >
              {" "}
              {dataById ? "Edit" : "Create"}
            </button>
          </div>
          <div className="clear-right"></div>
        </form>
      </div>
    </div>
  );
};

export default RegisterNotice;
