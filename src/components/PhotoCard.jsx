function PhotoCard({ photo, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <img
        src={`http://localhost:5000${photo.imageUrl}`}
        alt={photo.title}
        className="w-full h-52 object-contain"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{photo.title}</h3>

        <p className="text-gray-600 mt-2 line-clamp-3">{photo.description}</p>

        <p className="text-sm text-gray-500 mt-3">
          <span className="font-medium">Category:</span> {photo.category || 'N/A'}
        </p>

        {(onEdit || onDelete) && (
          <div className="mt-5 flex gap-3">
            {onEdit && (
              <button
                onClick={() => onEdit(photo)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(photo._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoCard;
