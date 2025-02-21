import axios from "axios";
import { useState } from "react";


const DeleteTask = ({ todo, todos, setTodos, user }) => {

    const [showModal, setShowModal] = useState(false);

    const confirmDeleteHandler = () => {
      setShowModal(true);
    };
    
    const deleteHandler = (id) => {
        console.log(id);
    
        const deleteData = async (id) => {
    
          const filterTodos = todos.filter((item) => item.id != id);
          console.log("filter", filterTodos);
          setTodos(filterTodos);
    
          user.todos = filterTodos;
          const userId = user.id;
    
          axios
            .put(`http://localhost:9000/users/${userId}`, user)
            .then((response) => {
              localStorage.setItem("user", JSON.stringify(user));
              setShowModal(false)
            })
            .catch((error) => {
              console.log(error);
            });
        };
        deleteData(id);
      };

  return (
    <>
      <i
        class="fa fa-trash cursor-pointer text-red-600"
        aria-hidden="true"
        onClick={confirmDeleteHandler}
      ></i>

      {showModal && (
        <div className=" w-1/2 rounded-md px-6 py-6 bg-slate-200 absolute top-0 left-0 bottom-0 right-0 m-auto">
          <h1 className="font-bold text-center text-2xl mb-5 text-[#d91b1b] flex items-center justify-center">
            حذف تسک
          </h1>
          <p>آیا اطمینان دارید از حذف تسک؟</p>
          <div className="flex">
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
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTask;
