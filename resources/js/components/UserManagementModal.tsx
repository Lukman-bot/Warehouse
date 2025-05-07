import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface UserManagement {
    id?: number;
    user_number: number;
    user_name: string;
    role: string;
    sex: string;
    contact_information: number;
    valid: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    user_management?: UserManagement | null;
}

export default function UserManagementFormModal({ isOpen, closeModal, user_management }: Props) {
    const [formData, setFormData] = useState<UserManagement>({ user_number: 0, user_name: "", role: "", sex: "", contact_information: 0, valid: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (user_management) {
            setFormData({
                user_number: user_management.user_number,
                user_name: user_management.user_name,
                role: user_management.role,
                sex: user_management.sex,
                contact_information: user_management.contact_information,
                valid: user_management.valid,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                user_number: 0,
                user_name: "",
                role: "",
                sex: "",
                contact_information: 0,
                valid: "",
            });
            setSelectedFile(null);
        }
    }, [user_management]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("user_number", formData.user_number.toString());
        data.append("user_name", formData.user_name);
        data.append("role", formData.role);
        data.append("sex", formData.sex);
        data.append("contact_information", formData.contact_information.toString());
        data.append("valid", formData.valid);

        if (user_management?.id) {
            data.append("_method", "PUT");
            router.post(`/user_management/${user_management.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.massage || "Gagal Menambahkan Data");
                }
            });
        }
        else {
            router.post('/user_management', data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Gagal Menambahkan Data");
                }
            });
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{ user_management ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">User Num</label>
                        <input
                            type="number"
                            name="user_number"
                            value={ formData.user_number }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">User Name</label>
                        <input
                            type="text"
                            name="user_name"
                            value={ formData.user_name }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={ formData.role }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Sex</label>
                        <input
                            type="text"
                            name="sex"
                            value={ formData.sex }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Contact Information</label>
                        <input
                            type="text"
                            name="contact_information"
                            value={ formData.contact_information }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Valid</label>
                        <input
                            type="text"
                            name="valid"
                            value={ formData.valid }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ user_management ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
