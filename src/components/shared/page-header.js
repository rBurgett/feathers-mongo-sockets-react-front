import React from 'react';

const PageHeader = ({ children }) => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="page-header">
                    <h1>{children}</h1>
                </div>
            </div>
        </div>
    );
};
PageHeader.propTypes = {
    children: React.PropTypes.string
};

export default PageHeader;
