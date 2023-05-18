const Quality = ({ user }) => {
  return (
    <>
      {user.qualities.map((quality) => (
        <span key={quality._id} className={`badge bg-${quality.color} me-1`}>
          {quality.name}
        </span>
      ))}
    </>
  );
};

export default Quality;
