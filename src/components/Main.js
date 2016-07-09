import React, { Component,Children } from 'react';
import HeaderContainer from './../containers/HeaderContainer';
import Footer from './Footer';
import SideBarContainer from '../containers/SideBarContainer';
import LoaderMain from './LoaderMain';

export default class Main extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateLoadingState = this.updateLoadingState.bind(this);
        this.isLoading = this.isLoading.bind(this);
        this.state = {
            isLoading: true
        };
    }

    componentWillReceiveProps(newProps) {

        //console.log("Main.js",newProps);

    }

    componentDidUpdate() {
        //console.log("didddddd");
    }

    updateLoadingState(isLoading) {
        //console.log(isLoading);
        this.setState({
            isLoading: isLoading
        });
    }

    isLoading(status) {
        return status != 'success';
    }

    updateTitle(title = "") {
        //console.log(title);
        document.title = `${title}-DigCSS.COM,A Web Design Blog.`
    }

    render() {
        const childrenWithProps = Children.map(this.props.children,
            (child) => {
                return React.cloneElement(child, {
                    updateTitle: this.updateTitle,
                    updateLoadingState: this.updateLoadingState,
                    isLoading: this.isLoading,
                    mainLoadingStatus: this.state.isLoading
                });
            }
        );
        return (
            <div className="mt30">
                <HeaderContainer {...this.props}/>
                <div className="wrap">
                    <div className="mainWrap fix">
                        <div className="l col-2-3">
                            <div className={this.state.isLoading?'loadingBox mainBox isLoading':'loadingBox mainBox'}>
                                <div className="loadingContent">
                                    {childrenWithProps}
                                </div>

                                {
                                    (()=> {
                                        if (this.state.isLoading) {
                                            return <LoaderMain/>
                                        }
                                    })()

                                }
                            </div>
                        </div>
                        <SideBarContainer/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
