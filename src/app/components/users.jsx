// https://getbootstrap.com/docs/5.1/content/tables/
// https://getbootstrap.com/docs/5.1/components/badge/

import React, { useState } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStarus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
// import "bootstrap-icons/font/bootstrap-icons.css";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const userCrop = paginate(users, currentPage, pageSize);

    const renderUsers = () => {
        return userCrop.map((user) => (
            <User
                key={user._id}
                user={user}
                onDelete={handleDelete}
                onBookmark={() => handleBookmark(user._id)}
            />
        ));
    };

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleBookmark = (userId) => {
        setUsers((prevState) => {
            return prevState.map((user) => {
                return user._id === userId
                    ? { ...user, bookmark: !user.bookmark }
                    : user;
            });
        });
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <>
            <SearchStatus number={count} />
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};

export default Users;
