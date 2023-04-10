import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await serverAuth(req, res);

    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

export default handler;
