import Link from "next/link";
import styles from "./category.module.css";

const Categories = ({ categories }) => {
    const showBlogCategories = () => (
        <ul className={styles.list}>
            {categories.map((category, i) => (
                <Link key={i} href={`/categories/${category.slug}`}>
                    <li className={styles.item}>{category.name}</li>
                </Link>
            ))}
        </ul>
    );

    return <>{showBlogCategories()}</>;
};

export default Categories;
