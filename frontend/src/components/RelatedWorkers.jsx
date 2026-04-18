import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedWorkers = ({ speciality, workId }) => {
  const { workers } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (workers.length > 0 && speciality) {
      const workersData = workers.filter(
        (doc) => doc.speciality === speciality && doc._id !== workId,
      );
      setRelDocs(workersData);
    }
  }, [workers, speciality, workId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
      <h1 className="text-3xl font-medium">Related Workers to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted workers.
      </p>
      {/* now we want 5 workers from assets files*/}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0">
        {relDocs.slice(0, 5).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/booking/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              className="w-full h-48 object-cover bg-[#EAEFFF]"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-red-500"}}`}
              >
                <p
                  className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-red-500"} rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm text-[#5C5C5C]">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/workers");
          scrollTo(0, 0);
        }}
        className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default RelatedWorkers;
