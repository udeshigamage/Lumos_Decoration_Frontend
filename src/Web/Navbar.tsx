const Navbar = () => {
  return (
    <div>
      <div
        className="navbar bg-base-100 bg-red-950 fixed"
        style={{ minHeight: "48px" }}
      >
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-serif text-white">
            LUMOS DECORATIONS
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-white font-serif">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about_us">About us</a>
            </li>
            <li>
              <a href="#contact_us">Contact us</a>
            </li>
            <li>
              <a href="/login">Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
