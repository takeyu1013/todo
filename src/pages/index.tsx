import { InferGetServerSidePropsType } from 'next'
import { ChangeEvent, useCallback, useState } from 'react';
import { client } from '../lib/supabase';

import type { NextPage } from 'next/types';

type Todo = {
  id: number,
  item: string
};

export const getServerSideProps = async () => {
  const response = await client.from<Todo>('todo').select('*');
  const data = response.data as Todo[];
  return {
    props: {
      data
    }
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const [todos, setTodos] = useState(data);
  const [newItem, setNewItem] = useState('Hell, word!');
  const change = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewItem(() => event.target.value);
  }, []);
  const add = async () => {
    const { data: todo } = await client.from<Todo>('todo').insert({ item: newItem }).single();
    setTodos([...todos, todo as Todo]);
  };
  const remove = async (id: number) => {
    await client.from<Todo>('todo').delete().eq('id', id);
    setTodos(todos.filter((todo) => todo.id != id));
  };
  return (
    <main className="min-h-screen bg-gray-100 pt-4">
      <div className="mx-auto w-72 md:w-1/2">
        <div className="pb-8 flex">
          <input className="px-2 py-1 flex-auto" value={newItem} onChange={change} />
          <button className="px-2 py-1 flex-shrink rounded text-white bg-green-500 hover:bg-green-700" onClick={add}>Add</button>
        </div>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="pb-4 flex">
              <li className="px-2 py-1 flex-auto bg-white list-none">{todo.item}</li>
              <button className="px-2 py-1 flex-shrink rounded text-white bg-red-500 hover:bg-red-700" onClick={remove.bind(this, todo.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
