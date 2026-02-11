import Head from "next/head";
import PostContent from "../../components/posts/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailsPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" description={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export function getStaticProps({ params }) {
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailsPage;
