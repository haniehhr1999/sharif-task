import { useState } from "react";

const InfoTask = ({ todo, todos, setTodos, user }) => {

    const [showModal, setShowModal] = useState(false);

  const confirmInfoHandler = () => {
    setShowModal(true);
  };

  return (
    <>
      <i
        onClick={confirmInfoHandler}
        className="fa mx-2 fa-info-circle text-blue-600 cursor-pointer"
        aria-hidden="true"
      ></i>
      {showModal && (
        // <div className="h-screen w-full bg-lime-400 absolute top-0 left-0 right-0 bottom-0">
          <div className=" w-1/2 rounded-md px-6 py-6 bg-slate-200 absolute top-0 left-0 bottom-0 right-0 m-auto">
            <h1 className="font-bold text-3xl mb-5 text-[#d91b1b]">
              نام تسک : {todo?.title}
            </h1>
            <h3 className="text-2xl">توضیحات تسک: </h3>
            <p className="my-5">{todo.desc}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-700 text-white rounded-md py-2 px-4"
            >
              بستن
            </button>

            {/* <div className="flex">
            <button
              onClick={() => deleteHandler(todo.id)}
              className="bg-green-700 rounded text-white w-full"
            >
              بله
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-700 rounded text-white w-full"
            >
              خیر
            </button>
          </div> */}
          </div>
        // </div>
      )}
    </>
  );
};

export default InfoTask;
