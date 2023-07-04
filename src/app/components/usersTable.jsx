import React from "react";
import PropTypes from "prop-types";
import User from "./user";
import TableHeader from "./tableHeader";

const UsersTable = ({ users, onDelete, onBookmark, onSort, selectedSort }) => {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualites: { name: "Качества" },
        professions: { iter: "profession.name", name: "Профессия" },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        delete: {}
    };
    const renderUsers = () => {
        return users.map((user) => (
            <User
                key={user._id}
                user={user}
                onDelete={onDelete}
                onBookmark={onBookmark}
            />
        ));
    };

    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <tbody>{renderUsers()}</tbody>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
