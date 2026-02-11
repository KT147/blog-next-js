import PostItem from "./post-item";
import styles from "./posts-grid.module.css"

function PostsGrid({ posts }) {

  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} item={post}/>
      ))}
    </ul>
  );
}

export default PostsGrid;
