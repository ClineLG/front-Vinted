import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MdNoPhotography } from "react-icons/md";
import Cookies from "js-cookie";
import "./offer.css";

const Offers = ({ setLogin }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
          `https://site--vinted-backend-project--dm4qbjsg7dww.code.run/offers/${id}`
          // `http://localhost:3000/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="section2">
      <div className="container">
        <div className="avoir">
          {data.product_image ? (
            <img
              className="mainPictureOffer"
              src={data.product_image.secure_url}
              alt="offer-main-picture"
            />
          ) : (
            <MdNoPhotography className="mainPictureOffer" />
          )}
          <div className="carroussel">
            {data.product_pictures &&
              data.product_pictures.map((picture, index) => {
                return <img key={index} src={picture.secure_url} alt="" />;
              })}
          </div>
        </div>
        <div className="rightDiv">
          <h2>{data.product_price} €</h2>
          <div className="details" key={data._id}>
            {data.product_details &&
              data.product_details.map((detail, index) => {
                return (
                  <p key={index}>
                    <span>{Object.keys(detail)}</span>
                    <span className="bold">{Object.values(detail)}</span>
                  </p>
                );
              })}
          </div>
          <div className="bottomRightDivOffer">
            <h3>{data.product_name}</h3>
            {data.product_description && <p>{data.product_description}</p>}
            <div className="ownerOffer">
              {data.owner.account.avatar && (
                <img src={data.owner.account.avatar.secure_url} alt="" />
              )}

              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/payment", { state: { offer: data } });
              if (!Cookies.get("token")) setLogin(true);
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </section>
  );
};
export default Offers;
