import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { client } from '../lib/supabase';

type Todo = {
  id: number,
  item: string
};

const Home = () => {
  const fetch = async () => {
    const { data: todos, error } = await client.from<Todo>('todo').select('*');
    if (!error) {
      setTodos(todos as Todo[]);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const [todos, setTodos] = useState([] as Todo[]);
  const [newItem, setNewItem] = useState('Hell, word!');
  const add = async () => {
    const { data: todo, error } = await client.from<Todo>('todo').insert({ id: todos.length + 1, item: newItem }).single();
    if (error) console.log('error', error);
    else setTodos([...todos, todo] as Todo[]);
  };
  const change = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewItem(() => event.target.value);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 pt-4">
      <div className="mx-auto w-1/2">
        <div className="pb-8 flex">
          <input className="px-2 py-1 flex-auto" value={newItem} onChange={change} />
          <button className="px-2 py-1 flex-shrink rounded text-white bg-green-500 hover:bg-green-700" onClick={add}>Add Item</button>
        </div>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="px-2 py-1 flex-auto bg-white list-none mb-4">{todo.item}</li>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
