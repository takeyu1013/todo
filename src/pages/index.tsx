import React, { useState } from "react";

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
  return (
    <>
      <button onClick={add}>Add Item</button>
      <div>
        {items.map((item) => {
          return <li>{item}</li>;
        })}
      </div>
    </>
  );
};

export default Home;
