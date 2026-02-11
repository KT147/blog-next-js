import Link from "next/link";
import styles from "./post-item.module.css";
import Image from "next/image";

function PostItem({ item }) {

  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${item.slug}/${item.image}`

  return (
    <li className={styles.post}>
      <Link href={`/posts/${item.slug}`}>
        <div className={styles.image}>
          <Image src={imagePath} alt={item.title} height={200} width={300} layout="responsive" />
        </div>
        <div className={styles.content}>
          <h3>{item.title}</h3>
          <time>{formattedDate}</time>
          <p>{item.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
