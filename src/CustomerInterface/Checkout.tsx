import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import pic07 from "../assets/pic22.jpg";

const Checkout = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const mycart = [
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      discount: "10",
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      discount: "10",
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 3,
      price: 1000,
      total: 1000,
      discount: "40",
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 6,
      price: 1000,
      total: 1000,
      discount: "20",
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 2,
      price: 1000,
      total: 1000,
      discount: "5",
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 32,
      price: 1000,
      total: 1000,
      discount: "10",
    },
  ];
  return (
    <div>
      <div
        className="min-h-screen "
        style={{
          backgroundImage: `url(${pic07})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-row justify justify-between bg-red-950 w-full mb-5">
          <h1 className="font-serif text-2xl font-bold text-white p-2 mb-5  ">
            Order Summary{" "}
          </h1>
          <button
            className="btn btn-danger text-lg bg-green-500 p-2 m-2 text-black font-serif hover:bg-green-900"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>

        <div className="flex flex-col justify-center items-center ">
          <div className="bg-white text-black p-20 m-5 opacity-90 rounded-lg">
            <h1 className="text-black font-serif font-black text-2xl">
              Order Summary
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row position-relative gap-2">
                  {" "}
                  <div>
                    <label htmlFor="firstName " className="font-serif">
                      Customer name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="email " className="font-serif">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Full name"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>
                </div>
                <div className="flex flex-row position-relative gap-2">
                  {" "}
                  <div>
                    <label htmlFor="email " className="font-serif">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Full name"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="email " className="font-serif">
                      Deadline date
                    </label>
                    <input
                      type="date"
                      placeholder="Full name"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="font-serif">
                    Your Total cost
                  </label>
                  <input
                    type="phone"
                    placeholder="Full name"
                    className="input input-bordered w-full max-w-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="font-serif">
                    Address
                  </label>
                  <textarea
                    placeholder="Message"
                    className="textarea textarea-bordered textarea-lg w-full max-w-md"
                  ></textarea>
                </div>

                <div>
                  <button className="btn btn-secondary bg-green-500">
                    check your ordersummary
                  </button>
                </div>
              </div>
              <button type="submit" className="bg-red-400 p-2 rounded-lg m-5">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

{
  /* <table className="table border-white bg-red-100 opacity-90 text-black  font-serif w-3/4 "> */
}
{
  /* head */
}
{
  /* <thead className="text-black text-xl">
  <tr>
    {/* <th>
<label>
  <input type="checkbox" className="checkbox" />
</label>
</th> */
}

//     <th>Product Id</th>
//     <th> Category</th>
//     <th>Item name</th>
//     <th>Quantity</th>
//     <th>Price</th>
//     <th>Total</th>
//     <th> Discount</th>
//     <th>Final Amount</th>
//   </tr>
// </thead> */}
{
  /* <tbody>
  {mycart?.length > 0 ? (
    mycart?.map((item: any, index: any) => (
      <tr>
        <td>
          <div className="d-flex justify-content-start flex-column">
            <a className="text-black text-hover-primary fs-6">
              {item?.product_id ?? "-"}
            </a>
          </div>
        </td>

        <td>
          <div className="d-flex justify-content-start flex-column">
            <a className="text-black text-hover-primary fs-6">
              {item?.category ?? "-"}
            </a>
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-start flex-column">
            <a className="text-black text-hover-primary ">
              {item?.item_name ?? "-"}
            </a>
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-start flex-column">
            <a className="text-black text-hover-primary fs-6 ">
              {item?.quantity ?? "-"}
            </a>
          </div>
        </td>
        <td>
          <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
            {item?.price ?? "-"}
          </a>
        </td>
        <td>
          <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
            {item.price * item.quantity}
          </a>
        </td>
        <td>
          <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md text-red-600 ">
            {item?.discount + "%"}
          </a>
        </td>
        <td>
          <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
            {item.price * item.quantity -
              (item.price * item.quantity * item.discount) / 100}
          </a>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7}>
        <div className="py-5 d-flex flex-column align-content-center justify-content-center">
          <div className="text-center">
            <div className="symbol symbol-200px ">
              <img src="/media/other/nodata.png" alt="" />
            </div>
          </div>
          <div className="d-flex text-center w-100 align-content-center justify-content-center fw-semibold fs-3 text-gray-400">
            No matching records found
          </div>
        </div>
      </td>
    </tr>
  )}
</tbody> */
}
{
  /* foot */
}
{
  /* </table> */
}
