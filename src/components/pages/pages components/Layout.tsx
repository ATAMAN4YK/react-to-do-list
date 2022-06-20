import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Layout.css';

type LayoutProps = {
    children?: React.ReactNode | JSX.Element;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {

    return (
        <>
            <div className="header">
                <span id="site-name">TO DO LIST</span>
                <div className="links">
                    <Link to="/Tasks">Task List</Link>
                    <Link to="/Categories">Categories</Link>
                </div>
            </div>
            <div className="main">
                {props.children}
            </div>
        </>
    );
}

export default Layout;