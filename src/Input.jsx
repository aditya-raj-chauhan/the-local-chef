import "./input.css";
import { useState } from "react";
import jsPDF from "jspdf";

function Input() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyDIA0eQUS-kXLA1aigc-noHPG7wXGt8jDI";

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient");

    if (newIngredient.trim()) {
      setIngredients((prev) => [...prev, newIngredient.trim()]);
      e.currentTarget.reset();
    }
  }

  async function handleGetRecipe() {
    if (ingredients.length < 2) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Suggest a recipe using these ingredients: ${ingredients.join(", ")}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipe");
      }

      const data = await response.json();
      if (data && data.candidates && data.candidates[0].content.parts[0].text) {
        let formattedRecipe = data.candidates[0].content.parts[0].text
          .replace(/[*#]/g, "")
          .replace(/\*\*\*/g, "<br /><br />");

        setRecipe(formattedRecipe);
      } else {
        setRecipe("No recipe found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe("Failed to fetch recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadPDF() {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Generated Recipe", 15, 20);
    doc.setFont("helvetica", "normal");
    doc.text(recipe.replace(/<br \/>/g, "\n"), 15, 30);
    doc.save("recipe.pdf");
  }

  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <div className="cont">
          <input
            type="text"
            placeholder="Add your ingredient"
            name="ingredient"
            className="xt"
          />
          <button type="submit">+ Add Ingredient</button>
        </div>
      </form>

      <div className="ingredients-recipe-container">
        <div className="ingredients-box">
          <h3>Ingredients:</h3>
          {ingredients.length > 0 ? (
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>Add an item</p>
          )}
          {ingredients.length >= 2 && (
            <button
              onClick={handleGetRecipe}
              disabled={loading}
              className="get-recipe-btn"
            >
              {loading ? "Fetching Recipe..." : "Get Recipe"}
            </button>
          )}
        </div>

        <div className="recipe-box">
          <h3>Recipe:</h3>
          <pre
            className="response"
            dangerouslySetInnerHTML={{
              __html:
                recipe || "add few ingridents and click on the get recipe button that appears",
            }}
          ></pre>
          {recipe && (
            <button onClick={handleDownloadPDF} className="download-btn">
              Download as PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
  