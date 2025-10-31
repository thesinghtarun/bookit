import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../components/helper/Card"; // adjust path if needed

// Define Experience data shape
interface Experience {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  available_date?: string[];
  available_time?: string[];
  image: string;
}

// Define response type from backend
interface ExperienceResponse {
  msg: string;
  data: Experience[];
}

const Home: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<Experience[]>([]); // current displayed experiences
  const [allData, setAllData] = useState<Experience[]>([]); // all experiences backup

  // Fetch all experiences
  const handleExperiences = async () => {
    try {
      const res = await fetch("http://localhost:3000/experiences", { method: "GET" });
      const resData: ExperienceResponse = await res.json();

      if (res.ok) {
        setData(resData.data);
        setAllData(resData.data); // keep original list saved
      } else {
        toast.error(resData.msg || "Failed to load experiences");
      }
    } catch (error) {
      console.error("Experiences error:", error);
      toast.error("Error loading experiences");
    }
  };

  // Search experiences
  const handleSearch = async () => {
    if (!name.trim()) {
      setData(allData);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const resData: ExperienceResponse = await res.json();
      console.log("Search:", resData.data);
      setName("");

      if (res.ok) {
        setData(resData.data);
      } else {
        toast.error(resData.msg || "Search failed");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Something went wrong during search");
    }
  };

  // Load experiences when page loads
  useEffect(() => {
    handleExperiences();
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#f9f9f9] flex justify-between items-center px-8 py-3 shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-6 h-6 bg-black text-[#FFD643] font-bold rounded-full">
            BT
          </div>
          <div className="flex flex-col leading-tight text-sm">
            <span className="text-black font-semibold">Book</span>
            <span className="text-black font-normal">It!</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={name}
            placeholder="Search experiences"
            className="w-72 px-3 py-2 bg-[#f2f2f2] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD643]"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#FFD643] text-black font-medium px-5 py-2 rounded-md hover:bg-yellow-400 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#f9f9f9]">
        {data && data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item._id}
              title={item.name}
              location={item.location}
              description={item.description}
              price={item.price}
              image={item.image}
              id={item._id}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No experiences found.
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
