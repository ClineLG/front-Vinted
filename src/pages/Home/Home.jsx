import { useEffect, useState } from "react";
import axios from "axios";

import "./home.css";
import { Link } from "react-router-dom";
import imgHeader from "/src/assets/imgs/homeheader.jpg";
import torn from "/src/assets/imgs/torn.svg";
import { MdNoPhotography } from "react-icons/md";
import PriceRange from "../../components/PriceRange";
import Pages from "../../components/Pages";
import HomeButton from "../../components/HomeButton";
import ToggleButton from "../../components/ToggleButton";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    priceMin: 0,
    priceMax: 6000,
    sort: false,
  });
  const tabPages = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vinted-backend-project--dm4qbjsg7dww.code.run/offers?page=${
            query.page
          }&title=${search}&sort=${
            query.sort ? "price-desc" : "price-asc"
          }&priceMin=${query.priceMin}&priceMax=${query.priceMax}&limit=${
            query.limit
          }`

          // `https://lereacteur-vinted-api.herokuapp.com/v2/offers?page=${
          //   query.page
          // }&title=${search}&sort=${
          //   query.sort ? "price-desc" : "price-asc"
          // }&priceMin=${query.priceMin}&priceMax=${query.priceMax}&limit=${
          //   query.limit
          // }`

          // `http://localhost:3000/offers?page=${
          //   query.page
          // }&title=${search}&sort=${
          //   query.sort ? "price-desc" : "price-asc"
          // }&priceMin=${query.priceMin}&priceMax=${query.priceMax}&limit=${
          //   query.limit
          // }`
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
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main>
      <section>
        <div className="sortHome container">
          <ToggleButton query={query} setQuery={setQuery} />
          <PriceRange id="priceRange" query={query} setQuery={setQuery} />
        </div>
        <div className="twinSortHome">
          <ToggleButton query={query} setQuery={setQuery} />

          <div className="priceMinPriceMax">
            <label htmlFor="priceMinPriceMax1">Prix Max :</label>

            <input
              id="priceMinPriceMax1"
              type="number"
              onChange={(e) => {
                const newQuery = { ...query };
                newQuery.priceMin = e.target.value;
                setQuery(newQuery);
              }}
            />
          </div>
          <div className="priceMinPriceMax">
            <label htmlFor="priceMinPriceMax2">Prix Min :</label>
            <input
              id="priceMinPriceMax2"
              type="number"
              onChange={(e) => {
                const newQuery = { ...query };
                newQuery.priceMax = e.target.value;
                setQuery(newQuery);
              }}
            />
          </div>
        </div>
        <div className="header">
          <img src={imgHeader} alt="" />
          <img src={torn} alt="" />
          <div className="absoHome">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Vendre maintenant !</button>
          </div>
        </div>
      </section>
      <div className="momResults">
        <div className="resultsNumber">
          <p>Nombre de resultats par page : </p>

          <HomeButton number={5} query={query} setQuery={setQuery} />
          <HomeButton number={12} query={query} setQuery={setQuery} />
          <HomeButton number={24} query={query} setQuery={setQuery} />
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
        <Pages
          query={query}
          setQuery={setQuery}
          data={data}
          tabPages={tabPages}
        />
      </section>
    </main>
  );
};

export default Home;
