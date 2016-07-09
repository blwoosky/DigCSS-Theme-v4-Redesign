import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Category extends Component {

    render() {

        let categories = this.props.categories;
        return (
            <div>
                {categories.map(function (category, index) {

                    if (index == categories.length - 1) {
                        return (
                            <span key={category.cat_ID}>
                                <Link to={`/category/${category.slug}`}>
                                    { category.name }
                                </Link>
                            </span>
                        )
                    } else {
                        return (
                            <span key={category.cat_ID}>
                                <Link to={`/category/${category.slug}`}>
                                    { category.name }
                                </Link>,
                            </span>
                        )
                    }

                })}
            </div>
        )
    }
}



