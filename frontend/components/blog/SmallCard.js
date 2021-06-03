import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";
import "./smallcard.css";

const Smallcard = ({ blog }) => {
    return (
        <Link href={`/blogs/${blog.slug}`}>
            <div className="smallcard">
                <img
                    className="smallcard__image"
                    src={`${API}/blog/photo/${blog.slug}`}
                />
                <div className="smallcard__title">
                    <h4>{blog.title}</h4>
                </div>
            </div>
        </Link>
    );
};

export default Smallcard;
