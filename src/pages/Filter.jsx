import { useParams, Navigate } from "react-router-dom";

export default function Filter() {
  const { category } = useParams();

  const validCategories = ["clothes", "crosses", "accesories"];

  // If category is NOT in the list → redirect or show error
  if (!validCategories.includes(category)) {
    return <Navigate to={`/${category}`} replace />;
  }

  return (
    <div>
      <h1>Filter page for: {category}</h1>
    </div>
  );
}
