import Bookmark from "./bookmark";
import Quality from "./quality";

const User = ({ user, onDelete, onBookmark, isFavorite }) => {
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
            isFavorite={isFavorite}
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

export default User;
