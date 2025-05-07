import { Client, Databases, ID, Query } from "react-native-appwrite";

// connection ids
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    const data = result.documents as unknown as TrendingMovie[];
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateSearchCount = async (query: string, movie: Movie) => {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("searchTerm", query),
  ]);
  try {
    // if document exists
    if (result.documents.length > 0) {
      // get the document
      const existingMovie = result.documents[0];

      // update the document
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      });
    }
  } catch (err) {
    console.log("boss may error: " + err);
    throw err;
  }
};
