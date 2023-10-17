import { Link } from "react-router-dom";
import urlImg1 from "../../assets/images/img_home1.jpeg";
import urlImg2 from "../../assets/images/img_home2.jpeg";
const InfoShop = () => {
  return (
    <section className="section-center home-title">
      <article className="content">
        <h1>design your comfort zone</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
          sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </p>
        <Link className="btn btn-product" to="/products">
          shop now
        </Link>
      </article>
      <article className="img-container">
        <img src={urlImg1} alt="" className="main-img" />
        <img src={urlImg2} alt="" className="accent-img" />
      </article>
    </section>
  );
};

export default InfoShop;
