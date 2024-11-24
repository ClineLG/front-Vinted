import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import imgHeader from "../assets/imgs/homeheader.jpg";
import torn from "../assets/imgs/torn.svg";
import { MdNoPhotography } from "react-icons/md";
import PriceRange from "../components/PriceRange";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    priceMin: 0,
    priceMax: 1000,
    sort: false,
  });
  const tabPages = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "https://site--vinted-backend-project--dm4qbjsg7dww.code.run/offers"
          // "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
          `http://localhost:3000/offers?page=${
            query.page
          }&title=${search}&sort=${
            query.sort ? "price-desc" : "price-asc"
          }&priceMin=${query.priceMin}&priceMax=${query.priceMax}&limit=${
            query.limit
          }`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [query, search]);

  if (!isLoading) {
    for (let i = 0; i < data.count / query.limit; i++) {
      tabPages.push(i + 1);
    }
  }

  // console.log(tabPages);
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main>
      <section>
        <div className="sortHome container">
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
          <PriceRange id="priceRange" query={query} setQuery={setQuery} />
          {/* <div> */}
          {/* <div> */}
          {/* <input
                type="number"
                placeholder="prix minimum"
                onChange={(e) => {
                  const newQuery = { ...query };
                  newQuery.priceMin = e.target.value;
                  setQuery(newQuery);
                }}
              />
              <input
                type="number"
                placeholder="prix maximum"
                onChange={(e) => {
                  const newQuery = { ...query };
                  newQuery.priceMax = e.target.value;
                  setQuery(newQuery);
                }}
              /> */}
          {/* </div> */}
          {/* </div> */}
        </div>
        <div className="header">
          <img src={imgHeader} alt="" />
          <img src={torn} alt="" />
          <div>
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Vendre maintenant !</button>
          </div>
        </div>
      </section>
      <div className="momResults">
        <div className="resultsNumber">
          <p>Nombre de resultats par page : </p>

          <button
            onClick={() => {
              const newQuery = { ...query };
              newQuery.limit = 5;
              newQuery.page = 1;
              setQuery(newQuery);
            }}
          >
            {" "}
            5
          </button>
          <button
            onClick={() => {
              const newQuery = { ...query };
              newQuery.page = 1;
              newQuery.limit = 10;
              setQuery(newQuery);
            }}
          >
            10
          </button>
          <button
            onClick={() => {
              const newQuery = { ...query };
              newQuery.page = 1;
              newQuery.limit = 20;
              setQuery(newQuery);
            }}
          >
            20
          </button>
          {/* 
        <input
          type="number"
          placeholder="nombre de resultat par page"
          onChange={(e) => {
            const newQuery = { ...query };
            newQuery.limit = e.target.value;
            setQuery(newQuery);
          }}
        /> */}
        </div>
      </div>

      <section className="section1">
        <div className="container">
          {data.offers.map((offer) => {
            return (
              <div className="offer" key={offer._id}>
                <div className="homeUser">
                  {offer.owner.account.avatar && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="user-avatar"
                    />
                  )}

                  <span>{offer.owner.account.username}</span>
                </div>

                <Link to={`/Offers/${offer._id}`}>
                  {offer.product_image ? (
                    <img
                      className="mainpicture"
                      src={offer.product_image.secure_url}
                      alt=""
                    />
                  ) : (
                    <MdNoPhotography className="mainpicture" />
                  )}
                </Link>
                <div className="homeDetailsOffer">
                  <h2>{offer.product_price.toFixed(2)} €</h2>
                  {offer.product_details &&
                    offer.product_details.map((details, index) => (
                      // console.log(details)
                      <p key={index}>{details.TAILLE}</p>
                    ))}
                  {offer.product_details &&
                    offer.product_details.map((details, index) => (
                      <p key={index}>{details.MARQUE}</p>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
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
      </section>
    </main>
  );
};

export default Home;
