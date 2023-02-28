import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h2>The Blog Posts</h2>
    </div>
  );
}

export default BlogPostsPage;
