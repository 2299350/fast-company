import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ user, onBookmark }) => {
    return user.bookmark ? (
        <i
            role="button"
            className="bi bi-bookmark-check-fill"
            onClick={onBookmark}
        ></i>
    ) : (
        <i role="button" className="bi bi-bookmark" onClick={onBookmark}></i>
    );
};

Bookmark.propTypes = {
    user: PropTypes.shape({
        bookmark: PropTypes.bool.isRequired
    }).isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default Bookmark;
