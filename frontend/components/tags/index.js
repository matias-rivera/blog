import Link from "next/link";
import styles from "./tag.module.css";

const Tags = ({ tags }) => {
    const showBlogTags = () => (
        <ul className={styles.list}>
            {tags.map((tag, i) => (
                <Link key={i} href={`/tags/${tag.slug}`}>
                    <li className={styles.item}>{tag.name}</li>
                </Link>
            ))}
        </ul>
    );

    return <>{showBlogTags()}</>;
};

export default Tags;
