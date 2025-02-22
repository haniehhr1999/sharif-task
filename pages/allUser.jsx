import { useEffect, useState } from "react";
import axios from "axios";

const AllUser = () => {
  const [datas, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/users`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-slate-300 p-8">
        {datas.map((data) => (
          <div className="bg-white m-3 p-4 rounded-md">
            <h1>نام کاربر : {data.username}</h1>
            <h2>تعداد کل تسک ها: {data.todos.length}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
