import Link from "next/link";
import { API_URL, STRAPI_URL } from "./config";

async function getGames() {
  const res = await fetch(
    `${API_URL}/video-games?populate[platforms][fields][0]=name&populate[cover][fields][0]=url`
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const { data } = await res.json();
  return data;
}

function getCoverImage({ attributes }) {
  const { url } = attributes.cover.data.attributes;
  return `${STRAPI_URL}${url}`;
}

export default async function Home() {
  const games = await getGames();
  console.log(games);
  return (
    <main className="flex min-h-screen flex-col items-left p-24">
      {games.map(({ attributes, id }) => (
        <Link
          key={id}
          href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={getCoverImage({ attributes })}
            alt={attributes.title}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {attributes.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
               {attributes.largeText}
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
}
