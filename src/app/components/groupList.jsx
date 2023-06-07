import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const preparedItems = Array.isArray(items) ? items : Object.values(items);
    return (
        <ul className="list-group">
            {preparedItems.map((item) => {
                const value = item[valueProperty];
                const content = item[contentProperty];
                return (
                    <li
                        key={value}
                        className={
                            "list-group-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        {content}
                    </li>
                );
            })}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired
    ]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
