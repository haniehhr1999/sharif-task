import DeleteTask from "@/components/Delete";
import DoneTask from "@/components/Done";
import InfoTask from "@/components/Info";
import TabTodo from "@/components/TabTodo";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
// import db from '../data/db.json'
import { useEffect, useState } from "react";

export default function TodoList({ data }) {
  const [todos, setTodoes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState("");
  const [txtValue, setTxtValue] = useState("");
  const [valTab, setValTab] = useState(0);

  //   console.log('todos' , todos)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setTodoes(user.todos);
  }, []);

  useEffect(() => {
    console.log("user => ", user);
  }, [user]);

  console.log("user => ", user);

  const handleList = async () => {
    const todo = {
      id: Date.now(),
      title: inputValue,
      desc: txtValue,
      done: false,
    };

    const updateTodos = [...todos, todo];
    setTodoes(updateTodos);

    user.todos = updateTodos;
    const userId = user.id;

    axios
      .put(`http://localhost:9000/users/${userId}`, user)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(user));
        setInputValue("")
        setTxtValue("")
        
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-amber-300 bg-ax">
      <div className="bg-[#ffffff4d] p-5 relative backdrop-blur-md rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-center text-3xl md:my-12 my-6 text-white">
            {" "}
            تو دو لیست
          </h1>
          <div className="font-bold text-white">
            سلام
            {user.username}!
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="bg-[#ffffff5c] md:px-16 shadow-md rounded-md md:py-10 p-5">
            <h2 className="text-2xl md:my-6 my-4 flex items-center">
              <i class="fa fa-thumb-tack px-3" aria-hidden="true"></i>
              ثبت تسک جدید
            </h2>
            <input
              type="text"
              className="w-full mb-4 rounded-md py-2 px-4 border border-slate-600 focus:outline-none focus:border-2 focus:bg-slate-100 bg-[#ffffff8b]"
              placeholder="عنوان تسک..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <textarea
              className="w-full mb-4 rounded-md py-2 px-4 border border-slate-600 focus:outline-none focus:border-2 focus:bg-slate-100 bg-[#ffffff8b]"
              name=""
              id=""
              placeholder="توضیحات تسک..."
              value={txtValue}
              onChange={(e) => setTxtValue(e.target.value)}
            ></textarea>

            <button
              onClick={handleList}
              className="py-2 px-4 bg-slate-600 hover:bg-slate-800 text-white w-full rounded-md"
            >
              وارد کردن
            </button>
          </div>
          <div className="bg-[#ffffff5c] md:px-16 shadow-md rounded-md md:py-10 p-5">
            <TabTodo setValTab={setValTab} />
            <h2 className="text-2xl py-4 md:my-6">
              <i class="fa fa-list px-3" aria-hidden="true"></i>
              لیست تسک های من
            </h2>
            <ul>
              {todos.length > 0 ? (
                todos
                  .filter((e) =>
                    valTab === 0 ? e : valTab === 1 ? e.done : !e.done
                  )
                  .map((todo, i) => (
                    <li
                      key={i}
                      className={
                        todo.done
                          ? "w-full mb-4 rounded-md py-2 px-4 bg-emerald-100 flex items-center justify-between"
                          : "w-full mb-4 rounded-md py-2 px-4 bg-red-100 flex items-center justify-between"
                      }
                    >
                      {todo.title}
                      <div>
                        <DoneTask
                          todo={todo}
                          todos={todos}
                          setTodos={setTodoes}
                          user={user}
                        />

                        <InfoTask
                          todo={todo}
                          todos={todos}
                          setTodos={setTodoes}
                          user={user}
                        />

                        <DeleteTask
                          todo={todo}
                          todos={todos}
                          setTodos={setTodoes}
                          user={user}
                        />
                      </div>
                    </li>
                  ))
              ) : (
                <h1>اطلاعاتی وجود ندارد</h1>
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-8">
          <Link
            href="/allUser"
            className="bg-slate-600 hover:bg-slate-800 text-white rounded py-1 px-4 inline-block"
          >
            مشاهده تمامی کاربران
          </Link>
        </div>
      </div>
    </div>
  );
}
