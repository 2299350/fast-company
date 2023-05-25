import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Quality from "./quality";

const User = ({ user, onDelete, onBookmark }) => {
    return (
        <>
            <tr key={user._id}>
                <th scope="row">{user.name}</th>
                <td>
                    <Quality user={user} />
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate + "/5"}</td>
                <td>
                    <Bookmark
                        user={user}
                        onBookmark={() => {
                            onBookmark(user._id);
                        }}
                    />
                </td>
                <td>
                    <button
                        className="btn btn-danger btn-sm m-2"
                        onClick={() => onDelete(user._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        profession: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        completedMeetings: PropTypes.number.isRequired,
        rate: PropTypes.number.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default User;
