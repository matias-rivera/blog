import Head from "next/head";
import Layout from "../../components/Layout";
import { API, DOMAIN, APP_NAME } from "../../config";
import { getTag } from "../../actions/tag";
import Smallcard from "../../components/blog/Smallcard";

const Tag = ({ tag, blogs }) => {
    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={tag.name} />
            <link rel="canonical" href={`${DOMAIN}/tags/${tag.slug}`} />
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
            <meta property="og:description" content={tag.name} />
            <meta property="og:type" content="website" />
            <meta property="og:url" href={`${DOMAIN}/tags/${tag.slug}`} />
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

    const showAllBlogs = () => {
        return blogs.map((blog, i) => <Smallcard blog={blog} key={i} />);
    };

    return (
        <>
            {head()}
            <Layout>
                <h1 className="text-center">{tag.name}</h1>
                {blogs.length > 0 ? (
                    <div className="blogs-display">{showAllBlogs()}</div>
                ) : (
                    <h1 className="text-center">No Blogs found</h1>
                )}
            </Layout>
        </>
    );
};

Tag.getInitialProps = ({ query }) => {
    return getTag(query.slug).then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { tag: data.tag, blogs: data.blogs };
        }
    });
};

export default Tag;
