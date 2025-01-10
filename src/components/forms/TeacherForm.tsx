"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

type TeacherFormData = {
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
};

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: TeacherFormData;
}) => {
  const [formData, setFormData] = useState<TeacherFormData>({
    username: data?.username || "",
    email: data?.email || "",
    password: data?.password || "",
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    phone: data?.phone || "",
    address: data?.address || "",
    bloodType: data?.bloodType || "",
    birthday: data?.birthday || "",
    sex: data?.sex || "male",
    img: data?.img || "",
  });

  const [errors, setErrors] = useState<Partial<TeacherFormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          img: "File size should be less than 1MB.",
        }));
      } else if (!file.type.startsWith("image/")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          img: "Only image files are allowed.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, img: undefined }));
        setFormData((prevData) => ({
          ...prevData,
          img: file.name, // Store file name or path
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<TeacherFormData> = {};
    let isValid = true;

    // Basic validation checks
    if (!formData.username) {
      newErrors.username = "Username is required!";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required!";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required!";
      isValid = false;
    }
    if (!formData.firstName) {
      newErrors.firstName = "First name is required!";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required!";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required!";
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required!";
      isValid = false;
    }
    if (!formData.bloodType) {
      newErrors.bloodType = "Blood type is required!";
      isValid = false;
    }
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required!";
      isValid = false;
    }
    if (!formData.sex) {
      newErrors.sex = "Sex is required!";
      isValid = false;
    }
    if (!formData.img) {
      newErrors.img = "Image is required!";
      isValid = false;
    }

    if (isValid) {
      // Submit data
      console.log(formData);

      // Optionally, reset form after successful submission
      handleReset();
    } else {
      setErrors(newErrors); // Set validation errors
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      bloodType: "",
      birthday: "",
      sex: "male",
      img: "",
    });
    setErrors({});
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.username && <p className="text-xs text-red-400">{errors.username}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
        </div>
      </div>
      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.firstName && <p className="text-xs text-red-400">{errors.firstName}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.lastName && <p className="text-xs text-red-400">{errors.lastName}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.address && <p className="text-xs text-red-400">{errors.address}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Blood Type</label>
          <input
            type="text"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.bloodType && <p className="text-xs text-red-400">{errors.bloodType}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.birthday && <p className="text-xs text-red-400">{errors.birthday}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && <p className="text-xs text-red-400">{errors.sex}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="img"
            name="img"
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.img && <p className="text-xs text-red-400">{errors.img}</p>}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;