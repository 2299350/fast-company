import React, { useState, useEffect } from "react";
import professionsApi from "../api/fake.api/professions.api";
import userApi from "../api/fake.api/user.api";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]);
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState([]);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        professionsApi.fetchAll().then((data) => setProfessions(data));
        userApi.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        setUsers(newUsers);
    };

    const handleBookmark = (userId) => {
        setUsers((prevState) =>
            prevState.map((user) =>
                user._id === userId
                    ? { ...user, bookmark: !user.bookmark }
                    : user
            )
        );
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (profession) => {
        setSelectedProf(profession);
        setCurrentPage(1);
    };

    const handleSort = (item) => {
        if (sortBy.iter === item) {
            setSortBy((prevState) => ({
                ...prevState,
                order: prevState.order === "asc" ? "desc" : "asc"
            }));
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
    };

    const clearFilter = () => {
        setSelectedProf(null);
        setCurrentPage(1);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    useEffect(() => {
        if (userCrop.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [userCrop]);

    return (
        <>
            <div className="d-flex flex-row flex-shrink-0 p-3">
                {professions && (
                    <>
                        <div>
                            <GroupList
                                items={professions}
                                selectedItem={selectedProf}
                                onItemSelect={handleProfessionSelect}
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

                    {filteredUsers.length > 0 && (
                        <UsersTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onBookmark={handleBookmark}
                            onSort={handleSort}
                        />
                    )}

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
