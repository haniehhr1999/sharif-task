import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch(
      `http://localhost:9000/users?username=${username}&password=${password}`
    );
    const users = await res.json();
    if (users.length > 0) {
      localStorage.setItem("user", JSON.stringify(users[0]));
      router.push("/todolist");
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col px-5 ">
    <div className="bg-cont w-full md:w-1/3 rounded-md px-6 py-6 bg-slate-200">
      <h1 className="font-bold text-center text-2xl mb-5 text-[#fb6f92] flex items-center justify-center">
        <i className="fa fa-sign-in px-3" aria-hidden="true"></i>
        ورود
      </h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full bg-[#ffffffb3] mb-3 rounded-sm py-1 px-3 outline-none focus:border-2 focus:border-[#fb6f926a] focus:bg-[#fb6f926a]"
        type="text"
        placeholder="نام کاربری "
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-[#ffffffb3] mb-3 rounded-sm py-1 px-3 outline-none focus:border-2 focus:border-[#fb6f926a] focus:bg-[#fb6f926a]"
        type="password"
        placeholder="رمز عبور"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-[#fb6f92] text-white mb-3 rounded-sm py-1 px-3 cursor-pointer"
      >
        ورود
      </button>
      <Link
        className="w-full block text-center  text-[#fb6f92] mt-5"
        href="/register"
      >
        حساب کاربری ندارید؟ اینجا کلیک کنید
      </Link>
    </div>
    </div>
  );
};

export default login;
