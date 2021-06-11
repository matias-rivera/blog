import { useState } from "react";
import NProgress from "nprogress";
import { APP_NAME } from "../../config";
import Link from "next/link";
import Router from "next/router";
import { signout, isAuth } from "../../actions/auth";
import styles from "./header.module.css";
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
            <div>
                <div
                    className={styles.search__close}
                    onClick={() =>
                        setValues({
                            search: undefined,
                            results: [],
                            searched: false,
                            message: "",
                        })
                    }
                >
                    <i class="fas fa-times-circle"></i>
                </div>
                {message && <p className={styles.search__message}>{message}</p>}

                {results.map((blog, i) => (
                    <Link href={`/blogs/${blog.slug}`} key={i}>
                        <a className={styles.search__link}>{blog.title}</a>
                    </Link>
                ))}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={onSubmit} className={styles.search}>
            <input
                placeholder=" Search"
                className={styles.search__input}
                type="text"
                onChange={handleChange}
            />
            <button type="submit" className={styles.search__button}>
                <i className="fas fa-search"></i>
            </button>
            {searched && (
                <div className={styles.dropdown}>{searchedBlogs(results)}</div>
            )}
        </form>
    );
    return (
        <>
            <div className={styles.navbar__container}>
                <nav className={styles.nav}>
                    <input
                        type="checkbox"
                        id="check"
                        className={styles.check}
                    />
                    <label htmlFor="check" className={styles.checkbtn}>
                        <i className="fas fa-bars"></i>
                    </label>
                    <Link href="/">
                        <label className={styles.navbar__logo}>
                            {APP_NAME}
                        </label>
                    </Link>

                    {searchForm()}
                    <ul className={styles.navbar__list}>
                        <Link href="/">
                            <li className={styles.navbar__item}>
                                <a className={styles.navbar__link}>Home</a>
                            </li>
                        </Link>
                        <Link href="/contact">
                            <li className={styles.navbar__item}>
                                <a className={styles.navbar__link}>Contact</a>
                            </li>
                        </Link>
                        {!isAuth() && (
                            <>
                                <Link href="/signin">
                                    <li className={styles.navbar__item}>
                                        <a className={styles.navbar__link}>
                                            Signin
                                        </a>
                                    </li>
                                </Link>
                                <Link href="/signup">
                                    <li className={styles.navbar__item}>
                                        <a className={styles.navbar__link}>
                                            Signup
                                        </a>
                                    </li>
                                </Link>
                            </>
                        )}

                        {isAuth() && isAuth().role === 0 && (
                            <Link href="/user">
                                <li className={styles.navbar__item}>
                                    <a className={styles.navbar__link}>
                                        Dashboard
                                    </a>
                                </li>
                            </Link>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                            <Link href="/admin">
                                <li className={styles.navbar__item}>
                                    <a className={styles.navbar__link}>
                                        Dashboard
                                    </a>
                                </li>
                            </Link>
                        )}

                        {isAuth() && (
                            <Link href="/">
                                <li className={styles.navbar__item}>
                                    <a
                                        className={styles.navbar__link}
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
                            <li className={styles.navbar__item}>
                                <a
                                    className={[
                                        styles.navbar__link,
                                        styles.navbar__light,
                                    ].join(" ")}
                                    href="#"
                                >
                                    Write a Blog
                                </a>
                            </li>
                        </Link>
                    </ul>
                    <Link href="/">
                        <label className={styles.homebtn}>
                            <i className="fas fa-home"></i>
                        </label>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Header;
