import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import db from '../data/db.json'
import { useEffect, useState } from "react";

export default function Home({data}) {
  const route = useRouter()
  // const [alltasks , setAlltasks] = useState(db)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      route.push('/todolist')
    } else{
      route.push('/login')
    }
  } , [])
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-red-500 text-5xl font-bold">درحال هدایت...</h1>
    </div>
  );
}
