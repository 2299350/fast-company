import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ number }) => {
    return (
        <>
            <span className={`badge bg-primary`}>
                <h5 className={`m-1`}>
                    {number + " человек тусанет с тобой сегодня"}
                </h5>
            </span>
        </>
    );
};

SearchStatus.propTypes = {
    number: PropTypes.number.isRequired
};

export default SearchStatus;
