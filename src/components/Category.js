import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from "react-redux";

class Category extends Component {

    constructor(props) {
        super(props);
        this.matchCategories = this.matchCategories.bind(this);
    }

    matchCategories(cat) {
        let categories = this.props.categories;
        let flag = categories.some(function (catID) {
            return cat.id == catID
        });
        //console.log(flag);
        return flag;
    }

    render() {

        let categories = this.props.categories,
            allCategories = this.props.allCategories.filter(this.matchCategories);

        //console.log(allCategories);

        return (
            <div>
                {allCategories.map(function (cat, index) {

                    if (index == allCategories.length - 1) {
                        return (
                            <span key={cat.cat_ID}>
                                <Link to={`/category/${cat.slug}`}>
                                    { cat.name }
                                </Link>
                            </span>
                        )
                    } else {
                        return (
                            <span key={cat.cat_ID}>
                                <Link to={`/category/${cat.slug}`}>
                                    { cat.name }
                                </Link>,
                            </span>
                        )
                    }

                })}
            </div>
        )
    }
}


function mapStateToProps(store) {
    return {
        allCategories: store.categories.categoryList
    };
}

export default connect(mapStateToProps)(Category);