const ToggleButton = ({ query, setQuery }) => {
  return (
    <div>
      <label>Trier par prix : </label>
      <button
        className={`toggle ${query.sort && "on"}`}
        onClick={() => {
          const newQuery = { ...query };
          newQuery.sort = !newQuery.sort;
          setQuery(newQuery);
        }}
      >
        <div className="ball"></div>
        <p>
          <span>－</span>
          <span>+</span>
        </p>
      </button>
    </div>
  );
};
export default ToggleButton;
