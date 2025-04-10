import { Form, Formik } from "formik";
import React, { useState } from "react";
import CommonLoading from "../Util/Commonloading";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { RootState } from "../reduxstore/Store_";
import { useSelector } from "react-redux";
import pic09 from "../assets/pic56.jpg";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Feedback = () => {
  const [isloading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  const navigate = useNavigate();

  const handleClick = (value: any) => {
    setRating(value);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove the file at the given index
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const user = useSelector((state: RootState) => state.user.userData);
  return (
    <div
      className="bg-gray-50 h-screen flex items-center justify-center relative "
      style={{
        backgroundImage: `url(${pic09})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "calc(100vh - 48px)",
      }}
    >
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl border-dotted border-b-4 border-red-600  border-t-4 ">
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              const formData = new FormData();

              formData.append("FeedbackDescription", values.comment);
              formData.append("Customer_ID", user?.User_ID?.toString() || "");
              files.forEach((file) => {
                formData.append("file", file);
              });
              formData.append("Rating", rating.toString());

              console.log("formdata", formData);
              await axios.post(`${API_URL}/Feedback/feedback`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              toast.success("successfully added feedback");
            } catch {
              toast.error("error adding feedback");
            } finally {
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
              resetForm();
              setFiles([]);
              setRating(0);
            }
          }}
        >
          {({ getFieldProps, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                Your Feedback Matters
              </h2>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-gray-700 font-medium"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  {...getFieldProps("comment")}
                  className="w-full p-4 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows={4}
                  placeholder="Write your feedback here..."
                />
              </div>

              <div>
                <label
                  htmlFor="file"
                  className="block text-gray-700 font-medium"
                >
                  Upload Files (Optional)
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles(Array.from(e.target.files)); // Update state to store multiple files
                    }
                  }}
                  multiple // Allow multiple file uploads
                  className="w-full mt-2 text-gray-700 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <p className="mt-2 text-gray-500 text-sm">
                  You can upload multiple files (images, documents, etc.).
                </p>
              </div>

              {/* Display Uploaded Files with Remove Option */}
              <div>
                {files.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800">
                      Uploaded Files:
                    </h3>
                    <ul className="mt-2 space-y-2 text-gray-700">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)} // Remove file when clicked
                            className="ml-2 text-red-500 hover:text-red-700 text-xs"
                          >
                            <MdClose />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Rating Section */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Rating
                </label>
                <div className="flex space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleClick(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      className={`transition-colors ${
                        (hovered || rating) >= star
                          ? "text-red-700"
                          : "text-black"
                      } text-3xl`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 mt-4 text-white bg-red-700 hover:bg-red-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit Feedback
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Loading Spinner */}
        {isloading && <CommonLoading />}
      </div>

      {/* Customer Profile in the Right Corner */}
      <div className="absolute top-5 right-5 p-4  shadow-lg rounded-lg w-48">
        <div className="text-center">
          {/* User details (optional) */}
          {/* <p className="text-gray-600 text-sm">{user?.Name}</p>
    <p className="text-gray-600 text-sm">{user?.Email}</p> */}

          {/* Stylish Back Button */}
          <button
            onClick={() => {
              navigate("/customer/services");
            }}
            className="mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-lg px-4 py-2 text-xs flex items-center justify-center space-x-2 transition-all ease-in-out duration-300 transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5M12 5l-7 7 7 7"
              />
            </svg>
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
