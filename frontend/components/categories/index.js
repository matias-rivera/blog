import Link from 'next/link'
import './category.css';


const Categories = ({categories}) => {

    const showBlogCategories = () => (

        <ul className='categories-list'>
            {categories.map((category,i) => (
            <Link key={i} href={`/categories/${category.slug}`}>
                <li className='categories-list__item'>
                    {category.name}
                </li>
            </Link>
        ))}
            
        </ul>
        
    )

    return ( 
        <>
            {showBlogCategories()}
        </>
     );
}
 
export default Categories;