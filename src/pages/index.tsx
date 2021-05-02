import { useState } from "react";

const ITEMS = [
  'Get groceries after work',
  'Do amazing things!',
  'Finish the Docker 101 workshop'
];

const Home = () => {
  const [items, setItems] = useState(ITEMS);
  const add = () => {
    setItems((items) => items.concat(['Hell, word!']));
  };
  const remove = (index: number) => {
    setItems((items) => {
      return items.splice(index, 1);
    });
  };
  return (
    <>
      <button onClick={add}>Add Item</button>
      <div>
        {items.map((item) => {
          return (
            <>
              <li key={item}>{item}</li>
              <button onClick={undefined}>Delete</button>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
