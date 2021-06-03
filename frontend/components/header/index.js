import { useState } from "react";
import NProgress from "nprogress";
import { APP_NAME } from "../../config";
import Link from "next/link";
import Router from "next/router";
import { signout, isAuth } from "../../actions/auth";
import "./header.css";
import { listSearch } from "../../actions/blog";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
    /* const [isOpen, setIsOpen] = useState(false); */

    /* const toggle = () => setIsOpen(!isOpen); */

    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: "",
    });

    const { search, results, searched, message } = values;

    const onSubmit = (e) => {
        e.preventDefault();
        listSearch({ search }).then((data) => {
            setValues({
                ...values,
                results: data,
                searched: true,
                message: `${data.length} results.`,
            });
        });
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            search: e.target.value,
            searched: false,
            results: [],
        });
    };

    const searchedBlogs = (results = []) => {
        return (
            <>
                {message && <p className="search__message">{message}</p>}

                {results.map((blog, i) => (
                    <Link href={`/blogs/${blog.slug}`} key={i}>
                        <a className="search__link">{blog.title}</a>
                    </Link>
                ))}
            </>
        );
    };

    const searchForm = () => (
        <form onSubmit={onSubmit} className="search">
            <input
                placeholder=" Search"
                className="search__input"
                type="text"
                onChange={handleChange}
            />
            <button type="submit" className="search__button">
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
    return (
        <>
            <div className="navbar__container">
                <nav>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="checkbtn">
                        <i className="fas fa-bars"></i>
                    </label>
                    <Link href="/">
                        <label className="navbar__logo">{APP_NAME}</label>
                    </Link>

                    {searchForm()}
                    <ul className="navbar__list">
                        <Link href="/">
                            <li className="navbar__item">
                                <a className="navbar__link">Home</a>
                            </li>
                        </Link>
                        <Link href="/contact">
                            <li className="navbar__item">
                                <a className="navbar__link">Contact</a>
                            </li>
                        </Link>
                        {!isAuth() && (
                            <>
                                <Link href="/signin">
                                    <li className="navbar__item">
                                        <a className="navbar__link">Signin</a>
                                    </li>
                                </Link>
                                <Link href="/signup">
                                    <li className="navbar__item">
                                        <a className="navbar__link">Signup</a>
                                    </li>
                                </Link>
                            </>
                        )}

                        {isAuth() && isAuth().role === 0 && (
                            <Link href="/user">
                                <li className="navbar__item">
                                    <a className="navbar__link">Dashboard</a>
                                </li>
                            </Link>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                            <Link href="/admin">
                                <li className="navbar__item">
                                    <a className="navbar__link">Dashboard</a>
                                </li>
                            </Link>
                        )}

                        {isAuth() && (
                            <Link href="/">
                                <li className="navbar__item">
                                    <a
                                        className="navbar__link"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            signout(() =>
                                                Router.replace(`/signin`)
                                            )
                                        }
                                    >
                                        Signout
                                    </a>
                                </li>
                            </Link>
                        )}
                        <Link href="/user/crud/blog">
                            <li className="navbar__item">
                                <a
                                    className="navbar__link navbar__link--light"
                                    href="#"
                                >
                                    Write a Blog
                                </a>
                            </li>
                        </Link>
                    </ul>
                    <Link href="/">
                        <label className="home-btn">
                            <i className="fas fa-home"></i>
                        </label>
                    </Link>
                </nav>
            </div>
            {searched ? (
                <div className="search__dropdown">{searchedBlogs(results)}</div>
            ) : (
                <>
                    <br />
                    <br />
                    <br />
                    <br />
                </>
            )}
        </>
    );
};

export default Header;
