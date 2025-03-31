import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reduxstore/Userslice";
import { RootState } from "../reduxstore/Store_";

const Navbarcustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);
  return (
    <div>
      <div className="navbar bg-base-100 bg-red-950 top-0 left-0 fixed">
        <div className="flex-1 ">
          <a className="btn btn-ghost text-2xl font-serif text-white">
            Lumos Decorations
          </a>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn-primary text-black font-serif font-bold bg-white  bg-opacity-40 hover:bg-white rounded-lg p-2 m-2"
            onClick={() => navigate("/customer/mycart")}
          >
            My cart
          </button>
          <button
            className="btn-primary text-black font-serif font-bold bg-white bg-opacity-40 hover:bg-white rounded-lg p-2 m-2"
            onClick={() => navigate("/customer/orderhistory")}
          >
            Order History
          </button>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <div className="flex flex-col  text-lg font-serif font-bold">
                  <p>{user?.Name}</p>
                  <p>{user?.Email}</p>
                  <p>{user?.Contact_no}</p>

                  <p>{user?.Role}</p>
                </div>
              </li>
              <li>
                <a>Edit</a>
              </li>
              <li onClick={() => dispatch(logout())}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbarcustomer;
