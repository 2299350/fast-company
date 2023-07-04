import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        role={columns[column].iter ? "button" : "default"}
                        onClick={
                            columns[column].iter
                                ? () => handleSort(columns[column].iter)
                                : undefined
                        }
                        scope="col"
                    >
                        {columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.shape({
        iter: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired
    }).isRequired,
    columns: PropTypes.objectOf(
        PropTypes.shape({
            iter: PropTypes.string,
            name: PropTypes.string
        })
    ).isRequired
};

export default TableHeader;
