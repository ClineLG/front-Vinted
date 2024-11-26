const HomeButton = ({ query, setQuery, number }) => {
  return (
    <button
      onClick={() => {
        const newQuery = { ...query };
        newQuery.limit = number;
        newQuery.page = 1;
        setQuery(newQuery);
      }}
    >
      {number}
    </button>
  );
};
export default HomeButton;
