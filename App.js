import { useEffect } from "react";
import { Navigation } from "./components/navigation";
import { createDatabase } from "./db";

export default function App() {
  useEffect(() => {
    createDatabase()
  }, []);
  return <Navigation />
}

