import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UsersTable = ({ users, onDelete, onBookmark, onSort }) => {
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
                    <th
                        role="button"
                        onClick={() => onSort("name")}
                        scope="col"
                    >
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th
                        role="button"
                        onClick={() => onSort("profession.name")}
                        scope="col"
                    >
                        Профессия
                    </th>
                    <th
                        role="button"
                        onClick={() => onSort("completedMeetings")}
                        scope="col"
                    >
                        Встретился, раз
                    </th>
                    <th
                        role="button"
                        onClick={() => onSort("rate")}
                        scope="col"
                    >
                        Оценка
                    </th>
                    <th
                        role="button"
                        onClick={() => onSort("bookmark")}
                        scope="col"
                    >
                        Избранное
                    </th>
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
    onBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};

export default UsersTable;
