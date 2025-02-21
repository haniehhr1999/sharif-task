import axios from "axios";

const DoneTask = ({ todo, todos, setTodos, user }) => {
  const doneHandler = (id) => {
    console.log(id);

    const doneData = async (id) => {
      const doTodos = todos.map((t) =>
        todo.id === t.id ? { ...t, done: true } : t
      );
      console.log("filter", doTodos);
      setTodos(doTodos);

      user.todos = doTodos;
      const userId = user.id;

      axios
        .put(`http://localhost:9000/users/${userId}`, user)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(user));
          //   setShowModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    doneData(id);
  };

  const handleClose = (id) => {
    console.log(id);

    const doneData = async (id) => {
      const doTodos = todos.map((t) =>
        todo.id === t.id ? { ...t, done: false } : t
      );
      console.log("filter", doTodos);
      setTodos(doTodos);

      user.todos = doTodos;
      const userId = user.id;

      axios
        .put(`http://localhost:9000/users/${userId}`, user)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(user));
          //   setShowModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    doneData(id);
  };

  return (
    <>
      {todo.done && (
        <i
          onClick={() => handleClose(todo.id)}
          className="fa fa-close cursor-pointer text-red-600"
          aria-hidden="true"
        ></i>
      )}

      {!todo.done && (
        <i
          onClick={() => doneHandler(todo.id)}
          className="fa fa-check cursor-pointer text-green-600"
          aria-hidden="true"
        ></i>
      )}
    </>
  );
};

export default DoneTask;
