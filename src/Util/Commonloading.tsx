import Loader from "./Loader";

const CommonLoading = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div role="status flex items-center justify-center">
          <div className="flex items-center justify-center mb-2">
            <Loader />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonLoading;
