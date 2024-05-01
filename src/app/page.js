import { API_URL } from "./config";

async function getGames() {
  const res = fetch(
    `${API_URL}/videogames?populate[platforms][fields][0]=name&populate[cover][fields][0]=url`
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Hello World</h2>
    </main>
  );
}
