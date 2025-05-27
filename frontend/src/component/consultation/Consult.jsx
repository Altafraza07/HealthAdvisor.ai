import { useContext, useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader/loader.json"; // adjust the path if needed
import { AuthContext } from "../../context/AuthContext";
import ConsultHindi from "./ConsultHindi"

const Consult = () => {

  const [formData, setFormData] = useState({
    symptomsText: "",
    selectedSymptoms: [],
    duration: "",
    bodyPart: "",
    severityLevel: "",
    age: "",
    gender: "",
    weight: "",
    conditions: "",
    medications: "",
    allergies: "",
    customMedication: "", // New state for custom medication
    customAllergy: "", // New state for custom allergy
    smoking: false,
    alcohol: false,
    drugs: false,
    diet: "",
    stressLevel: "",
    sleepPatterns: "",
    language:"en"
  });

  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState("en");

  const symptomsList = [
    "Fever",
    "Fatigue",
    "Headache",
    "Cough",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Chest Pain",
    "Shortness of Breath",
    "Sore Throat",
    "Runny Nose",
    "Muscle Pain",
    "Joint Pain",
    "Abdominal Pain",
    "Dizziness",
    "Back Pain",
    "Skin Rash",
    "Chills",
    "Sweating",
    "Loss of Appetite",
  ];

  // Handle form field change
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // Toggle symptom selection
  const toggleSymptom = (symptom) => {
    setFormData((prevData) => {
      const updatedSymptoms = prevData.selectedSymptoms.includes(symptom)
        ? prevData.selectedSymptoms.filter((item) => item !== symptom)
        : [...prevData.selectedSymptoms, symptom];
      return { ...prevData, selectedSymptoms: updatedSymptoms };
    });
  };

  // Toggle lifestyle choices
  const toggleLifestyle = (item) => {
    setFormData((prevData) => ({
      ...prevData,
      [item]: !prevData[item],
    }));
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    // clean medications and allergies if "Other" is selected
    const cleanedData = { ...formData };
    if (formData.medications === "Other") {
      cleanedData.medications = formData.customMedication;
    }
    if (formData.allergies === "Other") {
      cleanedData.allergies = formData.customAllergy;
    }
    delete cleanedData.customMedication;
    delete cleanedData.customAllergy;

    cleanedData.language = language;

    try {
      // Send form data to the backend
      const response = await fetch("https://healthadvisor-ai.onrender.com/api/ask-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from backend");
      }

      // Parse the response
      const data = await response.json();
      console.log("Backend response:", data); // Log the full response for debugging

      // Now, log the structure to check if there's a match with expected format
      console.log("Response structure:", data); // Log the entire response object

      // Check if the response has the expected structure
      if (data.reply) {
        const replyText = data.reply;
        setGeminiResponse(replyText);
      } else {
        setGeminiResponse("No valid response from Gemini.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setGeminiResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };



  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  if (language === "hi") {
    return <ConsultHindi />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-xl my-16 transition-all duration-500 ease-in-out animate-fade-in">
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh] ">
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            className="w-48 h-48"
          />
        </div>
      ) : !geminiResponse ? (
        <>
          {/* Symptoms */}
          <section className="mb-8 w-full">
            <div className="flex justify-between items-center">

           <h2 className="text-3xl text-teal-700 mb-8 mt-4 font-bold">Please fill out the form accurately for the best results
</h2>
            <button onClick={toggleLanguage} className="mb-8 mt-4 px-4 py-2 bg-teal-600 text-white rounded">Switch to Hindi</button>
             </div>

            <h3 className="text-xl font-semibold mb-4 text-teal-600">
              🩺 Describe Your Symptoms
            </h3>
            <textarea
              className="w-full p-4 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
              rows={4}
              placeholder="e.g., I feel weak and have chest pain"
              value={formData.symptomsText}
              onChange={(e) => handleChange(e, "symptomsText")}
            />

            <h4 className="text-md font-medium mb-2 text-gray-700">
              You can also select some common symptoms:
            </h4>
            <div className="flex justify-between w-full mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-24 gap-y-6 mb-6">
                {symptomsList.map((symptom) => (
                  <label
                    key={symptom}
                    className="flex items-center gap-2 text-gray-700 cursor-pointer transition-transform hover:scale-105"
                  >
                    <input
                      type="checkbox"
                      className="accent-teal-700 w-5 h-5 transition-all duration-300 ease-in-out transform hover:scale-110"
                      checked={formData.selectedSymptoms.includes(symptom)}
                      onChange={() => toggleSymptom(symptom)}
                    />
                    <span>{symptom}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">
              ⏳ Symptom Details{" "}
              <span className="text-teal-900 opacity-50">( Optional )</span>
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Duration Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Duration
                </label>
                <select
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.duration}
                  onChange={(e) => handleChange(e, "duration")}
                >
                  <option value="">Select Duration</option>
                  <option value="Since Today">Since Today</option>
                  <option value="1 day">Since 1 day</option>
                  <option value="2 days">Since 2 days</option>
                  <option value="1 week">Since 1 week</option>
                  <option value="2 weeks">Since 2 weeks</option>
                  <option value="1 month">Since 1 month</option>
                  <option value="More than a month">More than a month</option>
                </select>
              </div>

              {/* Body Part Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Body Part
                </label>
                <select
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.bodyPart}
                  onChange={(e) => handleChange(e, "bodyPart")}
                >
                  <option value="">Select Body Part</option>
                  <option value="Chest">Chest</option>
                  <option value="Stomach">Stomach</option>
                  <option value="Skin">Skin</option>
                  <option value="Head">Head</option>
                  <option value="Back">Back</option>
                  <option value="Leg">Leg</option>
                  <option value="Arm">Arm</option>
                  <option value="Neck">Neck</option>
                  <option value="Not in a specific body part">
                    Not in a specific body part
                  </option>
                  <option value="Not Relevant">Not Relevant</option>
                </select>
              </div>

              {/* Severity Level Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Severity Level
                </label>
                <select
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.severityLevel}
                  onChange={(e) => handleChange(e, "severityLevel")}
                >
                  <option value="">Select Severity</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>
          </section>

          {/* Basic Profile */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">
              👤 Basic Profile
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Age
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.age}
                  onChange={(e) => handleChange(e, "age")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Gender
                </label>
                <select
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.gender}
                  onChange={(e) => handleChange(e, "gender")}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.weight}
                  onChange={(e) => handleChange(e, "weight")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Pre-existing Conditions
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.conditions}
                  onChange={(e) => handleChange(e, "conditions")}
                />
              </div>
            </div>
          </section>

          {/* Medical History */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">
              💊 Medical History
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Medications */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Medications
                </label>
                <div className="relative">
                  <select
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                    value={formData.medications}
                    onChange={(e) => handleChange(e, "medications")}
                  >
                    <option value="">Select Predefined Medication</option>
                    <option value="Aspirin">Aspirin</option>
                    <option value="Ibuprofen">Ibuprofen</option>
                    <option value="Paracetamol">Paracetamol</option>
                    <option value="Amoxicillin">Amoxicillin</option>
                    <option value="Other">Other...</option>
                  </select>
                  {/* If "Other" is selected, show an input field to add custom medication */}
                  {formData.medications === "Other" && (
                    <input
                      type="text"
                      className="w-full p-3 mt-2 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                      placeholder="Enter your medication"
                      value={formData.customMedication}
                      onChange={(e) => handleChange(e, "customMedication")}
                    />
                  )}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Allergies
                </label>
                <div className="relative">
                  <select
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                    value={formData.allergies}
                    onChange={(e) => handleChange(e, "allergies")}
                  >
                    <option value="">Select Predefined Allergy</option>
                    <option value="Peanuts">Peanuts</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Pollen">Pollen</option>
                    <option value="Dust">Dust</option>
                    <option value="Other">Other...</option>
                  </select>
                  {/* If "Other" is selected, show an input field to add custom allergy */}
                  {formData.allergies === "Other" && (
                    <input
                      type="text"
                      className="w-full p-3 mt-2 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                      placeholder="Enter your allergy"
                      value={formData.customAllergy}
                      onChange={(e) => handleChange(e, "customAllergy")}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Lifestyle Choices */}
          <section className="my-8">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">
              🏃 Lifestyle Choices
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {["smoking", "alcohol", "drugs"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-gray-700 cursor-pointer transition-transform hover:scale-105"
                >
                  <input
                    type="checkbox"
                    className="accent-teal-700 w-5 h-5 transition-all duration-300 ease-in-out transform hover:scale-110"
                    checked={formData[item]}
                    onChange={() => toggleLifestyle(item)}
                  />
                  <span className="capitalize">{item}</span>
                </label>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {/* Dietary Habits */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Dietary Habits
                </label>
                <select
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.diet}
                  onChange={(e) => handleChange(e, "diet")}
                >
                  <option value="">Select Dietary Habit</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Keto">Keto</option>
                  <option value="Other">Other</option>
                </select>

                {/* Custom input for 'Other' option */}
                {formData.diet === "Other" && (
                  <input
                    type="text"
                    className="w-full p-3 mt-2 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                    placeholder="Specify your dietary habit"
                    value={formData.customDiet}
                    onChange={(e) => handleChange(e, "customDiet")}
                  />
                )}
              </div>

              {/* Stress Level */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Stress Level
                </label>
                <select
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.stressLevel}
                  onChange={(e) => handleChange(e, "stressLevel")}
                >
                  <option value="">Select Stress Level</option>
                  <option value="Very Low">Very Low</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>

              {/* Sleep Patterns */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Sleep Patterns
                </label>
                <select
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-600 transition"
                  value={formData.sleepPatterns}
                  onChange={(e) => handleChange(e, "sleepPatterns")}
                >
                  <option value="">Select Sleep Pattern</option>
                  <option value="Normal">Normal</option>
                  <option value="Insomnia">Insomnia</option>
                  <option value="Excessive Sleep">Excessive Sleep</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="mt-20 mb-10">
            <button
              onClick={handleSubmit}
              className="w-full bg-teal-700 text-white py-3 px-6 rounded-xl hover:bg-teal-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        // Display Gemini Response
        <div className="p-6 bg-gray-100 text-gray-800 rounded-lg shadow-md space-y-2 min-h-[60vh] overflow-y-auto">
          <h3 className="text-4xl font-bold mb-10">
            {user
              ? `Hello ${user.name}, Your Health Report is Ready :`
              : "Your Health Report :"}
          </h3>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: geminiResponse
                .replace(
                  /~(.+?)~/g,
                  "<h3 class='text-teal-600 font-bold text-2xl'>$1</h3>"
                )
                .replace(
                  /\*\*(.+?)\*\*/g,
                  "<span class='font-semibold text-gray-800 text-lg shadow-2xl'>$1</span>"
                )
                .replace(/\*(.+?)\*/g, "<em class='italic text-xl'>$1</em>")
                .replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Consult;
