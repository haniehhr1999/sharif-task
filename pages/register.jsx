import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    const user = { username, password, todos: [] };

    const res = await fetch("http://localhost:9000/users", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const res = await fetch(
        `http://localhost:9000/users?username=${username}&password=${password}`
      );
      const users = await res.json();
      localStorage.setItem("user", JSON.stringify(users[0]));
      router.push("/todolist");
    } else {
      alert("مشکلی در ثبت وجود دارد");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col px-5 ">
    <div className="bg-cont w-full md:w-1/3  rounded-md px-6 py-6 bg-slate-200">
      <h1 className="font-bold text-center text-2xl mb-5 text-[#62b643] flex items-center justify-center">
        <i className="fa fa-sign-in px-3" aria-hidden="true"></i>
        ثبت نام
      </h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full bg-[#ffffffb3] mb-3 rounded-sm py-1 px-3 outline-none focus:border-2 focus:border-[#62b64371] focus:bg-[#62b64371]"
        type="text"
        placeholder="نام کاربری "
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-[#ffffffb3] mb-3 rounded-sm py-1 px-3 outline-none focus:border-2 focus:border-[#62b64371] focus:bg-[#62b64371]"
        type="password"
        placeholder="رمز عبور"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-[#62b643] text-white mb-3 rounded-sm py-1 px-3 cursor-pointer"
      >
        ثبت نام{" "}
      </button>
      <Link
        className="w-full block text-center  text-[#62b643] mt-5"
        href="/login"
      >
        حساب کاربری ندارید؟ اینجا کلیک کنید
      </Link>
    </div>
    </div>
  );
};

export default register;
