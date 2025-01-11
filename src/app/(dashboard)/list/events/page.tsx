"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaSort, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa";

interface TeacherData {
  id: string;
  name: string;
  subjects: string;
  classes: string;
  phone: string;
  address: string;
}

const Page: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherData[]>([
    {
      id: "123",
      name: "John Doe",
      subjects: "Math, Physics",
      classes: "8th, 9th",
      phone: "+123456789",
      address: "New York, USA",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // state to track search input
  const [editData, setEditData] = useState<TeacherData | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

   // New states for sorting
   const [sortField, setSortField] = useState<keyof TeacherData | "">("");
   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
 
   useEffect(() => {
     const storedTeachers = localStorage.getItem("teachers");
     if (storedTeachers) {
       setTeachers(JSON.parse(storedTeachers));
     }
   }, []);

  // Load initial data from local storage
  useEffect(() => {
    const storedTeachers = localStorage.getItem("teachers");
    if (storedTeachers) {
      setTeachers(JSON.parse(storedTeachers));
    }
  }, []);

  // Update local storage whenever teachers state changes
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

  const handleDelete = (data: TeacherData) => {
    setEditData(data);
    setDeleteModalOpen(true);
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
    }
    setDeleteModalOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter teachers based on search term in any field

  const handleSort = (field: keyof TeacherData) => {
    setSortField(field);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Apply search and sorting
  const filteredTeachers = teachers
    .filter((teacher) =>
      Object.values(teacher)
        .map((field) => field.toLowerCase())
        .some((field) => field.includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">All Events</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm} // bind searchTerm to input value
            onChange={handleSearch} // handle search input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleAddTeacher}
          >
            + Add Event
          </button>
        </div>
      </div>

     {/* Info Section with Sortable Columns */}
     <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-7 gap-4 text-gray-700 font-semibold border-b pb-2">
          {["name", "id", "subjects", "classes", "phone", "address"].map((field) => (
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
          ))}
          <div>Action</div>
        </div>
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="grid grid-cols-7 gap-4 text-gray-600 py-4 border-b">
            <div>{teacher.name}</div>
            <div>{teacher.id}</div>
            <div>{teacher.subjects}</div>
            <div>{teacher.classes}</div>
            <div>{teacher.phone}</div>
            <div>{teacher.address}</div>
            <div className="flex space-x-2">
            <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => handleEdit(teacher)}
              >
               <FaEdit className="mr-2" />
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => handleView(teacher)}
              >
                <FaEye className="mr-2" />
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(teacher)}
              >
                 <FaTrash className="mr-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add Event</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const newTeacher = {
                  id: formData.get("id") as string,
                  name: formData.get("name") as string,
                  subjects: formData.get("subjects") as string,
                  classes: formData.get("classes") as string,
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
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="id"
                placeholder="Teacher ID"
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="subjects"
                placeholder="Subjects"
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="classes"
                placeholder="Classes"
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Teacher</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const updatedTeacher = {
                  id: editData.id,
                  name: formData.get("name") as string,
                  subjects: formData.get("subjects") as string,
                  classes: formData.get("classes") as string,
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
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="subjects"
                defaultValue={editData.subjects}
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="classes"
                defaultValue={editData.classes}
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                defaultValue={editData.phone}
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="address"
                defaultValue={editData.address}
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-red-500">Are you sure?</h2>
            <p className="mb-4">
              Do you really want to delete{" "}
              <span className="font-bold">{editData?.name}</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Teacher Details</h2>
            <p>
              <strong>Name:</strong> {editData.name}
            </p>
            <p>
              <strong>ID:</strong> {editData.id}
            </p>
            <p>
              <strong>Subjects:</strong> {editData.subjects}
            </p>
            <p>
              <strong>Classes:</strong> {editData.classes}
            </p>
            <p>
              <strong>Phone:</strong> {editData.phone}
            </p>
            <p>
              <strong>Address:</strong> {editData.address}
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
