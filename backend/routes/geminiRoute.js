import express from "express";
import { askGemini } from "../ai/gemini.js";

const router = express.Router();

router.post("/ask-gemini", async (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  try {
    const language = formData.language || "en";

    let prompt = "";

    if (language === "hi") {
      prompt = `
        लक्षण: ${formData.symptomsText}. 
        चयनित लक्षण: ${formData.selectedSymptoms.join(", ")}. 
        आयु: ${formData.age}. 
        लिंग: ${formData.gender}. 
        वजन: ${formData.weight}. 
        पूर्व स्थितियाँ: ${formData.conditions}. 
        दवाइयाँ: ${formData.medications}. 
        एलर्जी: ${formData.allergies}. 
        धूम्रपान: ${formData.smoking ? "हाँ" : "नहीं"}.
        शराब: ${formData.alcohol ? "हाँ" : "नहीं"}.
        ड्रग्स: ${formData.drugs ? "हाँ" : "नहीं"}.
        आहार: ${formData.diet}.
        तनाव स्तर: ${formData.stressLevel}.
        नींद का पैटर्न: ${formData.sleepPatterns}.
        
        कृपया नीचे दिए गए हिंदी निर्देशों के अनुसार केवल हिंदी में जवाब दें।
        एक मेडिकल असिस्टेंट AI के रूप में, कृपया ऊपर दी गई जानकारी के आधार पर स्वास्थ्य सलाह तैयार करें, जिसमें निम्न शामिल हों:

        *संभावित कारण:*
- रोगी की स्थिति के संभावित कारण स्पष्ट बुलेट पॉइंट्स में प्रस्तुत करें।

        *क्या करें और क्या न करें:*
- स्थिति को प्रबंधित करने में मदद करने के लिए कार्रवाई योग्य 'क्या करें' की नंबरित सूची प्रदान करें।
- ऐसी कार्रवाइयों की अलग नंबरित सूची दें जिन्हें स्थिति खराब करने या ठीक होने में देरी करने से बचना चाहिए।

*प्राकृतिक या घरेलू उपचार:*
- कोई सुरक्षित और संभावित सहायक प्राकृतिक या घरेलू उपचार सुझाएं जो लक्षण राहत दे सकते हैं। इन्हें सूची में प्रस्तुत करें, यह बताते हुए कि ये केवल सहायक देखभाल के लिए हैं और पेशेवर चिकित्सा सलाह का विकल्प नहीं हैं। ध्यान दें कि ये केवल भारत में उपलब्ध उपचार हों।

*संभावित जोखिम और चेतावनी संकेत जिनके लिए तुरंत चिकित्सा सहायता आवश्यक है:*
- ऐसे महत्वपूर्ण चेतावनी संकेत या संभावित जोखिम बताएं जिनके लिए तुरंत स्वास्थ्य पेशेवर से संपर्क करना आवश्यक है। इन्हें स्पष्ट बुलेट पॉइंट्स में प्रस्तुत करें।

*परामर्श अनुस्मारक:*
- एक अंतिम पैराग्राफ शामिल करें जो मरीज को नम्रतापूर्वक याद दिलाए कि यह जानकारी केवल मार्गदर्शन के लिए है और सही निदान व व्यक्तिगत उपचार के लिए योग्य चिकित्सा पेशेवर से परामर्श आवश्यक है।

कृपया सुनिश्चित करें कि प्रतिक्रिया स्पष्ट सेक्शन हेडिंग्स के साथ फॉर्मेट की गई हो और पठनीयता के लिए पैराग्राफ का उपयोग किया गया हो। महत्वपूर्ण शब्दों को दो तारों ** के बीच और हेडिंग्स को एकल ~ में रैप करें। सूचियों में नंबर बोल्ड में हों। सीधे जवाब देना शुरू करें बिना किसी अतिरिक्त बात के।
      `;
    } else {
      prompt = `
        Symptoms: ${formData.symptomsText}. 
        Selected Symptoms: ${formData.selectedSymptoms.join(", ")}. 
        Age: ${formData.age}. 
        Gender: ${formData.gender}. 
        Weight: ${formData.weight}. 
        Conditions: ${formData.conditions}. 
        Medications: ${formData.medications}. 
        Allergies: ${formData.allergies}. 
        Smoking: ${formData.smoking ? "Yes" : "No"}.
        Alcohol: ${formData.alcohol ? "Yes" : "No"}.
        Drugs: ${formData.drugs ? "Yes" : "No"}.
        Diet: ${formData.diet}.
        Stress Level: ${formData.stressLevel}.
        Sleep Patterns: ${formData.sleepPatterns}.

        As a medical assistant AI, please generate health advice based on the information above, including:

        *Possible Causes:*
- Provide a list of potential causes for the patient's condition, presented as clear bullet points.

        *Do's and Don'ts:*
- Offer a numbered list of actionable 'Do's' to help manage the situation.
- Provide a separate numbered list of 'Don'ts' to avoid actions that could worsen the condition or delay recovery.

*Natural or Home Remedies:*
- Suggest any safe and potentially helpful natural or home remedies that might provide symptomatic relief. Present these in list, emphasizing that these are for supportive care and not replacements for professional medical advice. Also keep in mind to only list remedies possible in INDIA.

*Potential Risks & Warning Signs Requiring Immediate Medical Attention:*
- Outline critical warning signs or potential risks that would necessitate immediate consultation with a healthcare professional. Present these as clear bullet points.

*Consultation Reminder:*
- Include a concluding paragraph that gently reminds the patient that this information is for guidance only and that a consultation with a qualified medical professional is essential for accurate diagnosis and personalized treatment.

Please ensure the response is formatted with clear section headings and uses paragraphs where appropriate for readability, follow these points for formatting:
-In your response wrap important words in 2 asterisks like ** and wrap headings in single ~ 
-When providing lists the number should be bold
-Important and essential words should be bold
-Directly start answering without telling anything extra
-after headings dont give line breaks
      `;
    }

    const geminiRawResponse = await askGemini(prompt);

    const geminiText =
      geminiRawResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Too many requests, please try again later";

    res.json({ reply: geminiText });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Error processing data" });
  }
});

export default router;
