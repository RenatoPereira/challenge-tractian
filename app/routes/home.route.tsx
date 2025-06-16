import { HomeScreen } from "~/screens/home";
import type { Route } from "./+types/home.route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Challenge - Tractian" },
    { name: "description", content: "Challenge - Tractian" },
  ];
}

export default function Home() {
  return <HomeScreen />;
}
