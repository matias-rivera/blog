import React from 'react';
import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { API } from '../../config'

const Card = ({blog}) => {


    const showBlogCategories = blog => (
        blog.categories.map((category,i) => (
            <Link key={i} href={`/categories/${category.slug}`}>
                <a className='btn btn-primary mx-1 mt-3'>{category.name}</a>
            </Link>
        ))
    )

    const showBlogTags = blog => (
        blog.tags.map((tag,i) => (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <a className='btn btn-outline-primary mx-1 mt-3'>{tag.name}</a>
            </Link>
        ))
    )

    return ( 
        <div className='lead pb-4'>
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a><h2 className='py-3 font-weight-bold'>{blog.title}</h2></a>
                </Link>
            </header>
            <section>
                <p className='mark ml-1 py-2'>
                    Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br />
                <br />
            </section>
            <div className='row'>
                <div className='col-md-4'>
                    <section>
                        <img 
                            className='img img-fluid'
                            style={{maxHeight: 'auto', width: '100%'}}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                    </section>
                </div>
                <div className='col-md-8'>
                    <section className='card border-0'>
                        <div className='pb-3' >
                            {renderHTML(blog.excerpt)}
                        </div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className='btn btn-primary pt-2'>Read more</a>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
     );
}
 
export default Card;