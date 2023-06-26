import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UsersTable = ({ users, onDelete, onBookmark }) => {
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
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>{renderUsers()}</tbody>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default UsersTable;
