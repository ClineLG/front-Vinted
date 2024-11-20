import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgHeader from "../assets/imgs/homeheader.jpg";
const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--vinted-backend-project--dm4qbjsg7dww.code.run/offers"
          //   "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setData(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        // <div>
        //   <h1>Home</h1>
        //   <Link to="/Offers/:id">offers</Link>
        // </div>
        <main>
          <section>
            <div className="sortHome container">
              <div>
                <label>Trier par prix</label>
                <button
                  className={`toggle ${sort && "on"}`}
                  onClick={() => {
                    setSort(!sort);
                  }}
                >
                  <div className="ball"></div>
                </button>
              </div>

              <div>
                <label>price</label>
                <div>
                  <div className="lilBall"></div>
                  <div className="lilBall"></div>
                </div>
              </div>
            </div>
            <div className="header">
              <img src={imgHeader} alt="" />
              <div>
                <h1>Prêts à faire du tri dans vos placards ?</h1>
                <button>Vends maintenant</button>
              </div>
            </div>
          </section>
          <section className="section1">
            <div className="container">
              {data.map((offer) => {
                offer.map;
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

                    <Link to={`/Offer/${offer._id}`} key={offer._id}>
                      {offer.product_image && (
                        <img
                          className="mainpicture"
                          src={offer.product_image.secure_url}
                          alt=""
                        />
                      )}
                    </Link>
                    <div className="homeDetailsOffer">
                      <h2>{offer.product_price} €</h2>
                      {offer.product_details &&
                        offer.product_details.map((details) => (
                          <p key={details.TAILLE}>{details.TAILLE}</p>
                        ))}
                      {offer.product_details &&
                        offer.product_details.map((details) => (
                          <p key={details.MARQUE}>{details.MARQUE}</p>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}
    </>
  );
};
export default Home;
