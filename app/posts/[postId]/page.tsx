import PagePost from "@/components/PagePost";
import { getSpecificMongoPost } from "@/services/mongoClient";

export default async function PostPageLayout({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const postData = await getSpecificMongoPost(postId);

    return <PagePost post={postData} />;
}
