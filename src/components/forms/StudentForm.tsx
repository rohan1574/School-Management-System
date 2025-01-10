import React, { useState } from "react";

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const [formData, setFormData] = useState({
    username: data?.username || "",
    email: data?.email || "",
    password: data?.password || "",
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    phone: data?.phone || "",
    address: data?.address || "",
    bloodType: data?.bloodType || "",
    birthday: data?.birthday || "",
    sex: data?.sex || "male",  // Default value for sex
    img: data?.img || null,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    bloodType: "",
    birthday: "",
    sex: "",
    img: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, img: file }));
    setErrors((prev) => ({ ...prev, img: "" })); // Clear error on file change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    let isValid = true;
    let newErrors: {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: string;
      address: string;
      bloodType: string;
      birthday: string;
      sex: string;
      img: string;
    } = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      bloodType: "",
      birthday: "",
      sex: "",
      img: "",
    };
  
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!formData.bloodType) {
      newErrors.bloodType = "Blood type is required";
      isValid = false;
    }
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
      isValid = false;
    }
    if (!formData.sex) {
      newErrors.sex = "Sex is required";
      isValid = false;
    }
    if (!formData.img) {
      newErrors.img = "Image is required";
      isValid = false;
    }
  
    if (isValid) {
      // Submit the form
      console.log(formData);
    } else {
      setErrors(newErrors); // Set validation errors
    }
  };
  

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new student" : "Update student"}</h1>
      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="username" className="text-xs text-gray-500">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.username ? "border-red-400" : ""}`}
          />
          {errors.username && <p className="text-xs text-red-400">{errors.username}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="email" className="text-xs text-gray-500">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.email ? "border-red-400" : ""}`}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="password" className="text-xs text-gray-500">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.password ? "border-red-400" : ""}`}
          />
          {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
        </div>
      </div>
      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="firstName" className="text-xs text-gray-500">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.firstName ? "border-red-400" : ""}`}
          />
          {errors.firstName && <p className="text-xs text-red-400">{errors.firstName}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="lastName" className="text-xs text-gray-500">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.lastName ? "border-red-400" : ""}`}
          />
          {errors.lastName && <p className="text-xs text-red-400">{errors.lastName}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="phone" className="text-xs text-gray-500">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.phone ? "border-red-400" : ""}`}
          />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="address" className="text-xs text-gray-500">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.address ? "border-red-400" : ""}`}
          />
          {errors.address && <p className="text-xs text-red-400">{errors.address}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="bloodType" className="text-xs text-gray-500">Blood Type</label>
          <input
            type="text"
            name="bloodType"
            id="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.bloodType ? "border-red-400" : ""}`}
          />
          {errors.bloodType && <p className="text-xs text-red-400">{errors.bloodType}</p>}
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="birthday" className="text-xs text-gray-500">Birthday</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.birthday ? "border-red-400" : ""}`}
          />
          {errors.birthday && <p className="text-xs text-red-400">{errors.birthday}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="sex" className="text-xs text-gray-500">Sex</label>
          <select
            name="sex"
            id="sex"
            value={formData.sex}
            onChange={handleSelectChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.sex ? "border-red-400" : ""}`}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.sex && <p className="text-xs text-red-400">{errors.sex}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="img" className="text-xs text-gray-500">Image</label>
          <input
            type="file"
            name="img"
            id="img"
            onChange={handleFileChange}
            className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${errors.img ? "border-red-400" : ""}`}
          />
          {errors.img && <p className="text-xs text-red-400">{errors.img}</p>}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          {type === "create" ? "Create" : "Update"} Student
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
