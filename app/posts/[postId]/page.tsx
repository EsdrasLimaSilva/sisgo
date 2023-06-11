import { getSpecificMongoPost } from "@/services/mongoClient";

export default async function PostPageLayout({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const postData = await getSpecificMongoPost(postId);
    console.log(postData);

    return <h1>{postData.title}</h1>;
}
