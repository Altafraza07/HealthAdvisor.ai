import { useContext, useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader/loader.json"; // आवश्यकतानुसार पथ समायोजित करें
import { AuthContext } from "../../context/AuthContext";
import Consult from "./Consult";

const ConsultHindi = () => {
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
    customMedication: "", 
    customAllergy: "", 
    smoking: false,
    alcohol: false,
    drugs: false,
    diet: "",
    stressLevel: "",
    sleepPatterns: "",
    language:"hi"
  });

  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState("hi");

  const symptomsList = [
    "बुखार",
    "थकान",
    "सिरदर्द",
    "खाँसी",
    "जी मिचलाना",
    "उल्टी",
    "दस्त",
    "छाती में दर्द",
    "सांस लेने में तकलीफ",
    "गले में खराश",
    "नाक बहना",
    "मांसपेशियों में दर्द",
    "जोड़ों का दर्द",
    "पेट दर्द",
    "चक्कर आना",
    "पीठ दर्द",
    "त्वचा पर चकत्ते",
    "ठंड लगना",
    "पसीना आना",
    "भूख न लगना",
  ];

  // फॉर्म फ़ील्ड परिवर्तन हैंडल करें
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // लक्षण चयन टॉगल करें
  const toggleSymptom = (symptom) => {
    setFormData((prevData) => {
      const updatedSymptoms = prevData.selectedSymptoms.includes(symptom)
        ? prevData.selectedSymptoms.filter((item) => item !== symptom)
        : [...prevData.selectedSymptoms, symptom];
      return { ...prevData, selectedSymptoms: updatedSymptoms };
    });
  };

  // जीवनशैली विकल्पों को टॉगल करें
  const toggleLifestyle = (item) => {
    setFormData((prevData) => ({
      ...prevData,
      [item]: !prevData[item],
    }));
  };

  // फॉर्म सबमिट हैंडल करें
  const handleSubmit = async () => {
    setLoading(true);

    // यदि "अन्य" चुना गया है तो दवाओं और एलर्जी को साफ़ करें
    const cleanedData = { ...formData };
    if (formData.medications === "अन्य") {
      cleanedData.medications = formData.customMedication;
    }
    if (formData.allergies === "अन्य") {
      cleanedData.allergies = formData.customAllergy;
    }
    delete cleanedData.customMedication;
    delete cleanedData.customAllergy;

    cleanedData.language = language;

    try {
      // फॉर्म डेटा को बैकएंड पर भेजें
      const response = await fetch("https://healthadvisor-ai.onrender.com/api/ask-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error("बैकएंड से प्रतिक्रिया प्राप्त करने में विफल");
      }

      // प्रतिक्रिया पार्स करें
      const data = await response.json();
      console.log("बैकएंड प्रतिक्रिया:", data); // डिबगिंग के लिए पूर्ण प्रतिक्रिया लॉग करें

      // अब, संरचना को लॉग इन करें ताकि यह जांचा जा सके कि अपेक्षित प्रारूप से कोई मेल है या नहीं
      console.log("प्रतिक्रिया संरचना:", data); // संपूर्ण प्रतिक्रिया ऑब्जेक्ट लॉग करें

      // जांचें कि प्रतिक्रिया में अपेक्षित संरचना है या नहीं
      if (data.reply) {
        const replyText = data.reply;
        setGeminiResponse(replyText);
      } else {
        setGeminiResponse("जेमिनी से कोई मान्य प्रतिक्रिया नहीं।");
      }
    } catch (error) {
      console.error("फॉर्म सबमिट करने में त्रुटि:", error);
      setGeminiResponse("कुछ गलत हो गया।");
    } finally {
      setLoading(false);
    }
  };



  if (language === "en") {
    return <Consult />;
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
      {/* लक्षण */}
      <section className="mb-12">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-3xl text-teal-700 font-bold">
            सर्वोत्तम परिणाम के लिए कृपया फॉर्म सही तरीके से भरें।
          </h2>
          <button
            onClick={() => setLanguage("en")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Switch to English
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3 text-teal-600">
            🩺 अपने लक्षणों का वर्णन करें
          </h3>
          <textarea
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
            rows={4}
            placeholder="उदाहरण के लिए, मुझे कमजोरी महसूस हो रही है और छाती में दर्द है"
            value={formData.symptomsText}
            onChange={(e) => handleChange(e, "symptomsText")}
          />
        </div>

        <div className="mt-6">
          <h4 className="text-md font-medium mb-3 text-gray-700">
            आप कुछ सामान्य लक्षण भी चुन सकते हैं:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {symptomsList.map((symptom) => (
              <label
                key={symptom}
                className="flex items-center gap-2 text-gray-700 cursor-pointer transition-colors duration-200 rounded-lg p-2 hover:bg-teal-50"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-teal-700 focus:ring-teal-500 rounded border-gray-300 transition-all duration-200"
                  checked={formData.selectedSymptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                />
                <span className="text-sm">{symptom}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-teal-600">
          ⏳ लक्षण विवरण <span className="text-teal-900 opacity-50">(वैकल्पिक)</span>
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {/* अवधि ड्रॉपडाउन */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              अवधि
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.duration}
              onChange={(e) => handleChange(e, "duration")}
            >
              <option value="">अवधि चुनें</option>
              <option value="आज से">आज से</option>
              <option value="1 दिन">1 दिन से</option>
              <option value="2 दिन">2 दिन से</option>
              <option value="1 सप्ताह">1 सप्ताह से</option>
              <option value="2 सप्ताह">2 सप्ताह से</option>
              <option value="1 महीना">1 महीना से</option>
              <option value="एक महीने से अधिक">एक महीने से अधिक</option>
            </select>
          </div>

          {/* शरीर का भाग ड्रॉपडाउन */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              शरीर का भाग
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.bodyPart}
              onChange={(e) => handleChange(e, "bodyPart")}
            >
              <option value="">शरीर का भाग चुनें</option>
              <option value="छाती">छाती</option>
              <option value="पेट">पेट</option>
              <option value="त्वचा">त्वचा</option>
              <option value="सिर">सिर</option>
              <option value="पीठ">पीठ</option>
              <option value="पैर">पैर</option>
              <option value="बांह">बांह</option>
              <option value="गर्दन">गर्दन</option>
              <option value="किसी विशिष्ट शरीर के भाग में नहीं">
                किसी विशिष्ट शरीर के भाग में नहीं
              </option>
              <option value="प्रासंगिक नहीं">प्रासंगिक नहीं</option>
            </select>
          </div>

          {/* गंभीरता स्तर ड्रॉपडाउन */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              गंभीरता स्तर
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.severityLevel}
              onChange={(e) => handleChange(e, "severityLevel")}
            >
              <option value="">गंभीरता चुनें</option>
              <option value="हल्का">हल्का</option>
              <option value="मध्यम">मध्यम</option>
              <option value="गंभीर">गंभीर</option>
            </select>
          </div>
        </div>
      </section>

      {/* बुनियादी प्रोफाइल */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-teal-600">
          👤 बुनियादी प्रोफाइल
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              आयु
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.age}
              onChange={(e) => handleChange(e, "age")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              लिंग
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.gender}
              onChange={(e) => handleChange(e, "gender")}
            >
              <option value="">चुनें</option>
              <option value="पुरुष">पुरुष</option>
              <option value="महिला">महिला</option>
              <option value="अन्य">अन्य</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              वजन (किलोग्राम)
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.weight}
              onChange={(e) => handleChange(e, "weight")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              पहले से मौजूद स्थितियाँ
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.conditions}
              onChange={(e) => handleChange(e, "conditions")}
            />
          </div>
        </div>
      </section>

      {/* चिकित्सा इतिहास */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-teal-600">
          💊 चिकित्सा इतिहास
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* दवाएं */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              दवाएं
            </label>
            <div className="relative">
              <select
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
                value={formData.medications}
                onChange={(e) => handleChange(e, "medications")}
              >
                <option value="">निर्धारित दवा चुनें</option>
                <option value="एस्पिरिन">एस्पिरिन</option>
                <option value="आइबुप्रोफेन">आइबुप्रोफेन</option>
                <option value="पैरासिटामोल">पैरासिटामोल</option>
                <option value="अमोक्सिसिलिन">अमोक्सिसिलिन</option>
                <option value="अन्य">अन्य...</option>
              </select>
              {formData.medications === "अन्य" && (
                <input
                  type="text"
                  className="w-full p-3 mt-2 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
                  placeholder="अपनी दवा दर्ज करें"
                  value={formData.customMedication}
                  onChange={(e) => handleChange(e, "customMedication")}
                />
              )}
            </div>
          </div>

          {/* एलर्जी */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              एलर्जी
            </label>
            <div className="relative">
              <select
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
                value={formData.allergies}
                onChange={(e) => handleChange(e, "allergies")}
              >
                <option value="">निर्धारित एलर्जी चुनें</option>
                <option value="मूंगफली">मूंगफली</option>
                <option value="डेयरी">डेयरी</option>
                <option value="पराग">पराग</option>
                <option value="धूल">धूल</option>
                <option value="अन्य">अन्य...</option>
              </select>
              {formData.allergies === "अन्य" && (
                <input
                  type="text"
                  className="w-full p-3 mt-2 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
                  placeholder="अपनी एलर्जी दर्ज करें"
                  value={formData.customAllergy}
                  onChange={(e) => handleChange(e, "customAllergy")}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* जीवनशैली विकल्प */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-teal-600">
          🏃 जीवनशैली विकल्प
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {["धूम्रपान", "शराब", "ड्रग्स"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 text-gray-700 cursor-pointer transition-colors duration-200 rounded-lg p-2 hover:bg-teal-50"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-teal-700 focus:ring-teal-500 rounded border-gray-300 transition-all duration-200"
                checked={formData[item]}
                onChange={() => toggleLifestyle(item)}
              />
              <span className="capitalize text-sm">{item}</span>
            </label>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {/* खान-पान की आदतें */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              खान-पान की आदतें
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.diet}
              onChange={(e) => handleChange(e, "diet")}
            >
              <option value="">खान-पान की आदत चुनें</option>
              <option value="शाकाहारी">शाकाहारी</option>
              <option value="मांसाहारी">मांसाहारी</option>
              <option value="वीगन">वीगन</option>
              <option value="ग्लूटेन-मुक्त">ग्लूटेन-मुक्त</option>
              <option value="कीटो">कीटो</option>
              <option value="अन्य">अन्य</option>
            </select>
            {formData.diet === "अन्य" && (
              <input
                type="text"
                className="w-full p-3 mt-2 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
                placeholder="अपनी खान-पान की आदत निर्दिष्ट करें"
                value={formData.customDiet}
                onChange={(e) => handleChange(e, "customDiet")}
              />
            )}
          </div>

          {/* तनाव का स्तर */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              तनाव का स्तर
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.stressLevel}
              onChange={(e) => handleChange(e, "stressLevel")}
            >
              <option value="">तनाव का स्तर चुनें</option>
              <option value="बहुत कम">बहुत कम</option>
              <option value="कम">कम</option>
              <option value="मध्यम">मध्यम</option>
              <option value="उच्च">उच्च</option>
              <option value="बहुत उच्च">बहुत उच्च</option>
            </select>
          </div>

          {/* सोने के पैटर्न */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              सोने के पैटर्न
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition text-gray-700"
              value={formData.sleepPatterns}
              onChange={(e) => handleChange(e, "sleepPatterns")}
            >
              <option value="">सोने का पैटर्न चुनें</option>
              <option value="सामान्य">सामान्य</option>
              <option value="अनिद्रा">अनिद्रा</option>
              <option value="अत्यधिक नींद">अत्यधिक नींद</option>
              <option value="अनियमित">अनियमित</option>
            </select>
          </div>
        </div>
      </section>

      {/* सबमिट बटन */}
      <div className="mt-12">
        <button
          onClick={handleSubmit}
          className="w-full bg-teal-700 text-white py-4 px-6 rounded-xl hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 font-semibold text-lg shadow-md"
        >
          सबमिट करें
        </button>
      </div>
    </>
      ) : (
        // जेमिनी प्रतिक्रिया प्रदर्शित करें
        <div className="p-6 bg-gray-100 text-gray-800 rounded-lg shadow-md space-y-2 min-h-[60vh] overflow-y-auto">
          <h3 className="text-4xl font-bold mb-10">
            {user
              ? `नमस्ते ${user.name}, आपकी स्वास्थ्य रिपोर्ट तैयार है:`
              : "आपकी स्वास्थ्य रिपोर्ट:"}
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

export default ConsultHindi;
