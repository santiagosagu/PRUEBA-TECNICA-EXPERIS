import { Routes, Route } from "react-router";
import CreatePost from "./src/pages/createPost/createPost";
import LayoutApp from "./src/components/LayoutApp";
import Dashboard from "./src/pages/dashboard/Dashboard";

export default function RouterApp() {
  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="posts-edit/:id" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}
