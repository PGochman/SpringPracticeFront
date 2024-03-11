import { Routes, Route } from "react-router-dom";
import Create from "../views/Create";
import View from "../views/View";

export default function InitialRoutes() {
  return (
    <Routes>
      <Route path="/create" element={<Create />} />
      <Route path="/view" element={<View />} />
    </Routes>
  );
}
