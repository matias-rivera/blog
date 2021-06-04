import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME } from "./../../config";
import Categories from "../../components/categories";
import Tags from "../../components/tags";

const Blogs = ({
    blogs,
    categories,
    tags,
    totalBlogs,
    blogsLimit,
    blogsSkip,
    router,
}) => {
    const head = () => (
        <Head>
            <title>Programming blogs | {APP_NAME}</title>
            <meta
                name="description"
                content="Programming blogs and tutorials"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta
                property="og:title"
                content={`Latest web development tutorials | ${APP_NAME}`}
            />
            <meta
                property="og:description"
                content="addddddddddddddddddddadadadadasda"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta
                property="og:image"
                content={`${DOMAIN}/static/images/image.jpg`}
            />
            <meta
                property="og:image:secure_url"
                content={`${DOMAIN}/static/images/image.jpg`}
            />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        const toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () =>
        size > 0 &&
        size >= limit && (
            <button
                className="btn btn-outline-primary btn-lg"
                onClick={loadMore}
            >
                Load More
            </button>
        );

    const showAllBlogs = () => {
        return blogs.map((blog, i) => <Card blog={blog} key={i} />);
    };

    const showAllCategories = () =>
        categories.map((category, i) => (
            <Link key={i} href={`/categories/${category.slug}`}>
                <a className="btn btn-primary mx-1 mt-3">{category.name}</a>
            </Link>
        ));

    const showAllTags = () =>
        tags.map((tag, i) => (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <a className="btn btn-outline-primary mx-1 mt-3">{tag.name}</a>
            </Link>
        ));

    const showLoadedBlogs = () =>
        loadedBlogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog} />
            </article>
        ));

    return (
        <>
            {head()}
            <Layout>
                <Categories categories={categories} />
                {showAllBlogs()}
                <Tags tags={tags} />
            </Layout>
        </>
    );
};

Blogs.getInitialProps = () => {
    const skip = 0;
    const limit = 20;
    return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
        if (data.error) {
            return console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogsSkip: skip,
            };
        }
    });
};

export default withRouter(Blogs);
