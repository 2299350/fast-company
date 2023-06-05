import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStarus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;

    useEffect(() => {
        if (
            filteredUsers.length <= (currentPage - 1) * pageSize &&
            currentPage > 1
        ) {
            setCurrentPage(currentPage - 1);
        }
    }, [filteredUsers.length, currentPage, pageSize]);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

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

    const handleProffessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <>
            <div className="d-flex flex-row flex-shrink-0 p-3">
                {professions && (
                    <>
                        <div>
                            <GroupList
                                items={professions}
                                selectedItem={selectedProf}
                                onItemSelect={handleProffessionSelect}
                                valueProperty="_id"
                                contentProperty="name"
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                Отменить фильтрацию
                            </button>
                        </div>
                    </>
                )}
                <div className="d-flex flex-column mx-3 flex-fill">
                    <SearchStatus number={filteredUsers.length} />
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
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={filteredUsers.length}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
