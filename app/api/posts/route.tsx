import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { PostEntity } from "@/contexts/EditorContext";

//posts
export async function GET() {
    try {
        const mongo = await clientPromise;
        const db = mongo.db("sisgo");

        const posts = await db.collection("posts").find({}).limit(10).toArray();

        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
    }
}

export async function PUT(req: NextRequest) {
    try {
        const post = (await req.json()) as PostEntity;

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

        return NextResponse.json("ok");
    } catch (err) {
        console.log(err);
    }
}
