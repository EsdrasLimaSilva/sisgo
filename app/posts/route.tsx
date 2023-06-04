import { NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";

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
