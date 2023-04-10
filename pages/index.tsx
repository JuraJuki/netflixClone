import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/auth", permanent: false } };
  }

  return { props: {} };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  console.log(user);

  return (
    <>
      <Navbar />
      <Billboard />
      <div className={"pb-40 text-white"}>
        <MovieList title={"Trending now"} data={movies} />
        <MovieList title={"Favorites"} data={favorites} />
      </div>
    </>
  );
}
