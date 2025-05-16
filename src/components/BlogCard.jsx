function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>

      <p className="text-gray-600 mt-3 leading-relaxed">
        {blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content}
      </p>

      <p className="text-sm text-gray-500 mt-4 italic">
        By <span className="font-medium">{blog.author}</span> on{' '}
        {new Date(blog.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>

      {(onEdit || onDelete) && (
        <div className="mt-6 flex gap-3">
          {onEdit && (
            <button
              onClick={() => onEdit(blog)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(blog._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogCard;
