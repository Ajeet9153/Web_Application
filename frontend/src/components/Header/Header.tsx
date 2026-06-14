import "./Header.css";

const Header = () => {
  return (
    <section className="header">

      <div className="hero-content">

        <span className="hero-badge">
          ⚡ Latest Electronics Collection
        </span>

        <h1>
          Upgrade Your Tech
          <span> Upgrade Your Life</span>
        </h1>

        <p>
          Premium smartphones,
          laptops, gaming gear,
          smartwatches and more.
        </p>

        <div className="hero-buttons">
          <button className="shop-btn">
            Shop Now
          </button>

          <button className="explore-btn">
            Explore
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <h2>10K+</h2>
            <span>Products</span>
          </div>

          <div>
            <h2>500+</h2>
            <span>Brands</span>
          </div>

          <div>
            <h2>50K+</h2>
            <span>Customers</span>
          </div>
        </div>

      </div>

      <div className="hero-image">
        <img
          src="/hero-electronics.png"
          alt=""
        />
      </div>

    </section>
  );
};

export default Header;