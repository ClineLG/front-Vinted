import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
const Pages = ({ query, setQuery, data, tabPages }) => {
  return (
    <div className="pages container">
      {query.page > 1 ? (
        <button
          onClick={() => {
            const newQuery = { ...query };
            newQuery.page = newQuery.page - 1;
            setQuery(newQuery);
          }}
        >
          <FaChevronLeft className="chevron" />
        </button>
      ) : (
        <div></div>
      )}
      {tabPages.map((e) => {
        return (
          <p
            onClick={() => {
              const newQuery = { ...query };
              if (newQuery.page !== e) {
                newQuery.page = e;
                setQuery(newQuery);
              }
            }}
            key={e}
            className={query.page === e ? "bold" : ""}
          >
            {e}
          </p>
        );
      })}
      {query.page < data.count / query.limit ? (
        <button
          onClick={() => {
            const newQuery = { ...query };
            newQuery.page = newQuery.page + 1;
            setQuery(newQuery);
          }}
        >
          <FaChevronRight className="chevron" />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Pages;
