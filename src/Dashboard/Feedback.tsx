import axios from "axios";

import { useEffect, useState } from "react";

import * as Yup from "yup";

//   // setIsLoading(true)
//   try {
//     // let response = await axios.post(`${API_URL}/Employee`);

//     // setcustomers(response.data.data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     //setIsLoading(false)
//   }
// };
const API_URL = import.meta.env.VITE_API_URL;
const Feedback = () => {
  const [Feedback, setFeedback] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, settotalitems] = useState(0);

  const pageSize = 5;

  const FeedbackSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),

    contactno: Yup.string().matches(
      /^\+?[1-9]\d{1,14}$/,
      "Contact number must be valid"
    ),
  });

  const fetchfeedback = async (page: number) => {
    console.log(API_URL);
    try {
      let response = await axios.get(
        `${API_URL}/Feedback?page=${page}&pageSize=${pageSize}`
      );

      setFeedback(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      settotalitems(response.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async (id: any) => {
    try {
      await axios.delete(`${API_URL}/Feedback/${id}`);
    } catch (error) {
      console.log(error);
    }
    fetchfeedback(currentPage);
  };
  useEffect(() => {
    fetchfeedback(currentPage);
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="px-5 py-5 rounded-lg ">
        {" "}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="">
            <h1 className="text-4xl text-black font-bold font-serif">
              Feedbacks
            </h1>
          </div>
          <div className="flex items-center gap-4 px-5"></div>
        </div>
      </div>
      <div>
        <div style={{ minHeight: "calc(100vh - 320px)" }}>
          <div className="overflow-x-auto">
            <table className="table border-white bg-red-100 opacity-90 text-black">
              {/* head */}
              <thead className="text-black text-xl">
                <tr>
                  {/* <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th> */}

                  <th>Customer Name</th>
                  <th>Category</th>
                  <th>Feedback date</th>
                  <th>Rating</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Feedback?.length > 0 ? (
                  Feedback?.map((item: any, index: any) => (
                    <tr>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6">
                            {item?.customer_ID ?? "-"}
                          </a>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6">
                            {item?.feedbackCategory ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6">
                            {item?.feedbackDate ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary ">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <input
                                key={star}
                                type="radio"
                                name={`rating-${item?.id || "default"}`} // Unique name for each item's rating
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked={star === item?.rating} // Highlight the stars based on the rating
                                disabled // Make it read-only
                              />
                            ))}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6">
                            {item?.feedbackDescription ?? "-"}
                          </a>
                        </div>
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
              </tbody>
              {/* foot */}
            </table>
            <div className="flex flex-col items-end">
              <div className="pagination ">
                <button
                  className="btn mt-5 mr-5 bg-black"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="text-black">
                  Page {currentPage} of {totalPages}: {totalItems}
                </span>
                <button
                  className="btn ml-5 bg-black"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
