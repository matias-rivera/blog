import Link from 'next/link'
import './tag.css';


const Tags = ({tags}) => {

    const showBlogTags = () => (

        <ul className='tags-list'>
            {tags.map((tag,i) => (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <li className='tags-list__item'>
                    {tag.name}
                </li>
            </Link>
        ))}
            
        </ul>
        
    )

    return ( 
        <>
            {showBlogTags()}
        </>
     );
}
 
export default Tags;