/* "use client";

export default function FormUserProfile({ action, user }) {
  return (
    <form className="form-grid" action={action}>
      <label htmlFor="firstname">Name</label>
      <input
        id="name"
        type="text"
        firstnamename="firstname"
        placeholder="Type name"
        defaultValue={user?.firstname}
      />

      <label htmlFor="email">Mail</label>
      <input
        type="email"
        name="email"
        placeholder="Type email"
        disabled
        defaultValue={user?.email}
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Type your title"
        defaultValue={user?.title}
      />

      <div className="btns">
        <button>Save User</button>
      </div>
    </form>
  );
}
 */
export default function FormUserProfile({ action, user }) {
  return (
    <form className="grid gap-4" action={action}>
      <label htmlFor="firstname" className="block">
        Navn
      </label>
      <input
        id="firstname"
        name="firstname"
        type="text"
        placeholder={user?.firstname}
        defaultValue={user?.firstname}
        className="p-2 border rounded w-full"
      />

      <label htmlFor="email" className="block">
        Mail
      </label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Type email"
        defaultValue={user?.email}
        disabled
        className="p-2 border rounded w-full bg-gray-100 cursor-not-allowed"
      />

      <label htmlFor="title" className="block">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Type your title"
        defaultValue={user?.title}
        className="p-2 border rounded w-full"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
      >
        Save User
      </button>
    </form>
  );
}
