import { useEffect, useState } from "react";
import { Badge, Button, Form, Table, Modal, InputGroup } from "react-bootstrap";
import { fetchTodos } from "../data/datatodos";

const Todos = () => {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(1);

  // Modal Add
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const data = fetchTodos();
    setTodosRaw(data);
  }, []);

  useEffect(() => {
    let filtered = onlyWaiting
      ? todosRaw.filter((t) => !t.completed)
      : todosRaw;

    const start = (curPage - 1) * itemsPerPage;
    const end = start + Number(itemsPerPage);
    const paginated = filtered.slice(start, end);

    setNumPages(Math.ceil(filtered.length / itemsPerPage));
    setTodos(paginated);
  }, [todosRaw, onlyWaiting, itemsPerPage, curPage]);

  // toggle waiting/done 
  const toggleStatus = (id) => {
    const updated = todosRaw.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodosRaw(updated);
  };

  // delete todo
  const deleteTodo = (id) => {
    const updated = todosRaw.filter((t) => t.id !== id);
    setTodosRaw(updated);
  };

  //  add new todo
  const addTodo = () => {
    if (!newTitle.trim()) return;
    const newTodo = {
      id: todosRaw.length + 1,
      title: newTitle.trim(),
      completed: false,
    };
    setTodosRaw([newTodo, ...todosRaw]);
    setNewTitle("");
  };

  return (
    <div className="todos-container p-3 bg-warning-subtle rounded">
      {/*  Add todo */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold text-dark">Todo List</h5>
        <InputGroup style={{ width: "350px" }}>
          <Form.Control
            type="text"
            placeholder="Typing your todo title here..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button variant="primary" onClick={addTodo}>
            <i className="bi bi-plus-circle"></i> Add
          </Button>
        </InputGroup>
      </div>

      {/* filters */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="custom-switch"
            onChange={(e) => {
              setOnlyWaiting(e.target.checked);
              setCurPage(1);
            }}
          />
          <label htmlFor="custom-switch" className="ms-2">
            Show only&nbsp;
            <Button
              variant="warning"
              style={{ pointerEvents: "none", padding: "2px 8px" }}
            >
              waiting&nbsp;<i className="bi bi-clock"></i>
            </Button>
          </label>
        </div>

        <Form.Select
          aria-label="Items per page"
          className="w-auto"
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurPage(1);
          }}
          value={itemsPerPage}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
        </Form.Select>
      </div>

      {/* ตาราง */}
      <Table striped hover bordered>
        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: "4rem" }}>ID</th>
            <th>Title</th>
            <th style={{ width: "14rem" }}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="text-center">
                <Badge bg="secondary">{todo.id}</Badge>
              </td>
              <td>{todo.title}</td>
              <td className="text-end">
                {todo.completed ? (
                  <Button
                    variant="success"
                    title="Click to change to waiting"
                    onClick={() => toggleStatus(todo.id)}
                  >
                    done <i className="bi bi-check"></i>
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    title="Click to change to done"
                    onClick={() => toggleStatus(todo.id)}
                  >
                    waiting <i className="bi bi-clock"></i>
                  </Button>
                )}
                &nbsp;
                <Button
                  variant="danger"
                  title="Delete this todo"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* pagination */}
      <div className="text-center mt-3">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage <= 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          Page {curPage} / {numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(numPages)}
          disabled={curPage >= numPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Todos;
