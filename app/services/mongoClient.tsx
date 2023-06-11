import { PostEntity } from "@/contexts/EditorContext";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getMongoPosts(limit: number = 10) {
    try {
        const mongo = await clientPromise;
        const db = mongo.db("sisgo");

        const documents = await db
            .collection("posts")
            .find({})
            .limit(limit)
            .toArray();

        const posts: PostEntity[] = documents.map((document: unknown) => {
            const { _id, ...rest } = document as PostEntity;

            return { _id: _id.toString(), ...rest };
        });

        return posts;
    } catch (err) {
        throw err;
    }
}

export async function createMongoPost() {
    try {
        const mongo = await clientPromise;
        const db = mongo.db("sisgo");

        const response = await db.collection("posts").insertOne({});

        return response;
    } catch (err) {
        throw err;
    }
}

export async function editMongoPost(post: PostEntity) {
    try {
        const mongo = await clientPromise;
        const db = mongo.db("sisgo");

        await db.collection("posts").updateOne(
            { _id: new ObjectId(post._id) },
            {
                $set: {
                    title: post.title,
                    metadescription: post.metadescription,
                    tags: post.tags,
                    entities: post.entities,
                },
            }
        );
    } catch (err) {
        throw err;
    }
}

export async function deleteMongoPost(postId: string) {
    try {
        const mongo = await clientPromise;
        const db = mongo.db("sisgo");

        await db.collection("posts").deleteOne({ _id: new ObjectId(postId) });
    } catch (err) {
        throw err;
    }
}
