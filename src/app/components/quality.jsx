import React from "react";
import PropTypes from "prop-types";

const Quality = ({ user }) => {
    return (
        <>
            {user.qualities.map((quality) => (
                <span
                    key={quality._id}
                    className={`badge bg-${quality.color} me-1`}
                >
                    {quality.name}
                </span>
            ))}
        </>
    );
};

Quality.propTypes = {
    user: PropTypes.shape({
        qualities: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

export default Quality;
