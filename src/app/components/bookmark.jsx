const Bookmark = ({ user, onBookmark }) => {
  return user.bookmark ? (
    <i className="bi bi-bookmark-check-fill" onClick={onBookmark}></i>
  ) : (
    <i className="bi bi-bookmark" onClick={onBookmark}></i>
  );
};

export default Bookmark;
