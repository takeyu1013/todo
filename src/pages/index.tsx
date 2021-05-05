import { ChangeEvent, useState } from "react";

const ITEMS = [
  'Get groceries after work',
  'Do amazing things!',
  'Finish the Docker 101 workshop'
];

const Home = () => {
  const [items, setItems] = useState(ITEMS);
  const [newItem, setNewItem] = useState('Hell, word!');
  const add = () => {
    setItems(items => items.concat([newItem]));
  };
  const remove = (index: number) => {
    setItems(items => {
      const result = [...items];
      result.splice(index, 1);
      return result;
    });
  };
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setNewItem(() => event.target.value);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <input className="px-2 py-1" value={newItem} onChange={change} />
      <button className="px-2 py-1 rounded text-white bg-green-500 hover:bg-green-700" onClick={add}>Add Item</button>
      <div>
        {items.map((item, index) => {
          return (
            <div className="bg-white">
              <li key={index}>{item}</li>
              <button onClick={remove.bind(this, index)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
