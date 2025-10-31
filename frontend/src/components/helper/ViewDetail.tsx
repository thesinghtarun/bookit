import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Define the shape of an experience
interface Experience {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  available_date: string[];
  available_time: string[];
  image: string;
}

const ViewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const email = localStorage.getItem("userEmail");

  const fetchDetail = async () => {
    try {
      const res = await fetch(`https://bookit-backend-99nd.onrender.com/experiences/${id}`);
      const data = await res.json();
      // If backend returns { data: {...} }, change to setExperience(data.data)
      setExperience(data);
    } catch (error) {
      console.error("Error fetching detail:", error);
      toast.error("Error fetching experience details");
    }
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time!");
      return;
    }

    if (!experience) {
      toast.error("Experience not loaded!");
      return;
    }

    try {
      const res = await fetch("https://bookit-backend-99nd.onrender.com/bookexperience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: experience.name,
          selectedTime,
          selectedDate,
          location: experience.location,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(`Booking confirmed for ${selectedDate} at ${selectedTime}`);
      } else {
        toast.error(result.msg || "Booking failed!");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Server error!");
    }
  };

  if (!experience) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const { name, description, image, price, available_date, available_time } = experience;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Details</h1>
      </div>

      {/* Image and Price Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="md:col-span-2">
          <img
            src={image}
            alt={name}
            className="rounded-lg w-full h-80 object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-600 mb-4">{description}</p>

          {/* Dates */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Choose date</h3>
            <div className="flex flex-wrap gap-2">
              {available_date.map((date, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`border px-3 py-1 rounded-lg ${
                    selectedDate === date
                      ? "bg-yellow-400 text-white"
                      : "border-gray-300 hover:bg-yellow-100"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Times */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Choose time</h3>
            <div className="flex flex-wrap gap-2">
              {available_time.map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`border px-3 py-1 rounded-lg ${
                    selectedTime === time
                      ? "bg-yellow-400 text-white"
                      : "border-gray-300 hover:bg-yellow-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">About</h3>
            <p className="text-gray-600">
              Scenic routes, trained guides, and safety briefing. Minimum age 10.
            </p>
          </div>
        </div>

        {/* Right Side (Price Summary) */}
        <div className="border rounded-lg p-4 shadow-sm">
          <p className="flex justify-between mb-2">
            <span>Starts at</span>
            <span>₹{price}</span>
          </p>
          <p className="flex justify-between mb-2">
            <span>Quantity</span>
            <span>1</span>
          </p>
          <p className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{price}</span>
          </p>
          <p className="flex justify-between mb-2">
            <span>Taxes</span>
            <span>₹59</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{price + 59}</span>
          </p>
          <button
            onClick={handleConfirm}
            className="bg-yellow-400 text-white w-full mt-4 py-2 rounded-md hover:bg-yellow-500 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
