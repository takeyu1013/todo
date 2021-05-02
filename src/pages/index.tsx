const ITEMS = [
  'Get groceries after work',
  'Do amazing things!',
  'Finish the Docker 101 workshop'
];

const Home = () => {
  return (
    <>
      <button>Add Item</button>
      <div>
        {ITEMS.map((item) => {
          return <li>{item}</li>;
        })}
      </div>
    </>
  );
};

export default Home;
