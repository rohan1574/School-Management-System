"use client";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaTrash,
} from "react-icons/fa";

interface TeacherData {
  id: string;
  name: string;
  email: string;
  students: string[]; // Array of student names or IDs
  phone: string;
  address: string;
}

const ParentPage: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherData[]>([
    {
      id: "123",
      name: "John Doe",
      email: "jo@example.com",
      students: ["Student A"],
      phone: "+123456789",
      address: "New York",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState<TeacherData | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  const [sortField, setSortField] = useState<keyof TeacherData | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Load data from localStorage
  useEffect(() => {
    const storedTeachers = localStorage.getItem("teachers");
    if (storedTeachers) {
      setTeachers(JSON.parse(storedTeachers));
    }
  }, []);

  // Update localStorage whenever teachers state changes
  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  const handleAddTeacher = () => {
    setAddModalOpen(true);
  };

  const handleView = (data: TeacherData) => {
    setEditData(data);
    setViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const teacherToDelete = teachers.find((teacher) => teacher.id === id);
    if (teacherToDelete) {
      setEditData(teacherToDelete); // Set the teacher to be deleted
      setDeleteModalOpen(true); // Open the delete modal
    }
  };

  const handleEdit = (data: TeacherData) => {
    setEditData(data);
    setEditModalOpen(true);
  };

  const handleSaveTeacher = (newTeacher: TeacherData) => {
    setTeachers([...teachers, newTeacher]);
    setAddModalOpen(false);
  };

  const handleUpdateTeacher = (updatedTeacher: TeacherData) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    );
    setEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (editData) {
      setTeachers(teachers.filter((teacher) => teacher.id !== editData.id));
      setDeleteModalOpen(false); // Close the modal after deletion
      setEditData(null); // Clear the selected teacher data
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: keyof TeacherData) => {
    setSortField(field);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredTeachers = teachers
    .filter((teacher) =>
      Object.values(teacher)
        .map((field) => field.toString().toLowerCase())
        .some((field) => field.includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField].toString().toLowerCase();
      const valueB = b[sortField].toString().toLowerCase();
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">All Parents</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleAddTeacher}
          >
            + Add Parent
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
  <div className="grid grid-cols-7 gap-1 text-gray-700 font-semibold border-b pb-2">
    {["name", "id", "email", "phone", "address", "students", "Action"].map(
      (field) => (
        <div
          key={field}
          className="flex items-center cursor-pointer"
          onClick={() => handleSort(field as keyof TeacherData)}
        >
          <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
          {sortField === field ? (
            sortDirection === "asc" ? (
              <FaSortUp className="ml-2 text-sm" />
            ) : (
              <FaSortDown className="ml-2 text-sm" />
            )
          ) : (
            <FaSort className="ml-2 text-sm" />
          )}
        </div>
      )
    )}
  </div>

  {filteredTeachers.map((teacher) => (
    <div
      key={teacher.id}
      className="grid grid-cols-7 gap-4 text-gray-600 py-4 border-b"
    >
      <div>{teacher.name}</div>
      <div>{teacher.id}</div>
      <div>{teacher.email}</div>
      <div>{teacher.phone}</div>
      <div>{teacher.address}</div>
      <div>{teacher.students.join(", ")}</div>
      <div className="flex space-x-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={() => handleEdit(teacher)}
        >
          <FaEdit />
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={() => handleView(teacher)}
        >
          <FaEye />
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => handleDelete(teacher.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  ))}
</div>

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Parent</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const newTeacher: TeacherData = {
                  id: `${Math.floor(Math.random() * 1000)}`,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  students: (formData.get("students") as string)
                    .split(",")
                    .map((s) => s.trim()),
                  phone: formData.get("phone") as string,
                  address: formData.get("address") as string,
                };
                handleSaveTeacher(newTeacher);
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                name="students"
                placeholder="Students (comma-separated)"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 px-4 py-2 rounded"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Parent</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const updatedTeacher: TeacherData = {
                  ...editData,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  students: (formData.get("students") as string)
                    .split(",")
                    .map((s) => s.trim()),
                  phone: formData.get("phone") as string,
                  address: formData.get("address") as string,
                };
                handleUpdateTeacher(updatedTeacher);
              }}
            >
              <input
                type="text"
                name="name"
                defaultValue={editData.name}
                placeholder="Name"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="email"
                name="email"
                defaultValue={editData.email}
                placeholder="Email"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                name="students"
                defaultValue={editData.students.join(", ")}
                placeholder="Students (comma-separated)"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                name="phone"
                defaultValue={editData.phone}
                placeholder="Phone"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                name="address"
                defaultValue={editData.address}
                placeholder="Address"
                required
                className="w-full border p-2 mb-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 px-4 py-2 rounded"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">View Parent</h2>
            <p>
              <strong>Name:</strong> {editData.name}
            </p>
            <p>
              <strong>Email:</strong> {editData.email}
            </p>
            <p>
              <strong>Students:</strong> {editData.students.join(", ")}
            </p>
            <p>
              <strong>Phone:</strong> {editData.phone}
            </p>
            <p>
              <strong>Address:</strong> {editData.address}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p>Do you want to delete {editData.name}?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentPage;
