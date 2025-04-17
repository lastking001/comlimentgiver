const apiKey = "AIzaSyAykGI3LLVsXdR8ZwHf0l08E1u2TkrZLe8"; // Replace with your actual Gemini API key

const button = document.getElementById("generateBtn");
const complimentBox = document.getElementById("compliment");
const loadingText = document.getElementById("loading");

// Possible styles to make compliments more random and human
const moods = ["filmy", "funny", "emotional", "romantic", "cute", "magical"];
const bodyFocus = [
  "her smile", 
  "eyes", 
  "voice", 
  "personality", 
  "inner strength", 
  "kind heart", 
  "overall beauty"
];

button.addEventListener("click", async () => {
  complimentBox.style.opacity = 0;
  loadingText.style.display = "block";

  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  const randomBodyFocus = bodyFocus[Math.floor(Math.random() * bodyFocus.length)];

  const prompt = `
    Give a fresh, heartfelt, and unique Hinglish and morden and cheezy compliment for a girl named Priyanshi. 
    The compliment should sound like it's inspired by Bollywood dialogues — make it ${randomMood} and uplifting. 
    Help her feel more confident, especially about ${randomBodyFocus}. 
    Avoid repeating previous compliments. 
    Keep it short, sweet, poetic if possible, and extremely human.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95
          }
        })
      }
    );

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Failed to fetch from the API. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);  // Log the API response for debugging

    // Extract the compliment from the API response
    const compliment = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (compliment) {
      complimentBox.innerText = compliment; // Display the generated compliment
    } else {
      complimentBox.innerText = "Server se pyaar ka paighaam nahi aa paaya 😔. Thoda intezaar karo.";
    }

  } catch (error) {
    console.error("Error:", error);
    complimentBox.innerText = "Server se pyaar ka paighaam nahi aa paaya 😔. Thoda intezaar karo..";
  } finally {
    loadingText.style.display = "none";
    complimentBox.style.opacity = 1;
  }
});
