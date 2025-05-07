import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface UserRole {
    id?: number;
    user_role: string;
    valid: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    user_role?: UserRole | null;
}

export default function UserRoleFormModal({ isOpen, closeModal, user_role }: Props) {
    const [formData, setFormData] = useState<UserRole>({ user_role: "", valid: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (user_role) {
            setFormData({
                user_role: user_role.user_role,
                valid: user_role.valid,
            });
            setSelectedFile(null);
        }
        else {
            setFormData({
                user_role: "",
                valid: "",
            });
            setSelectedFile(null);
        }
    }, [user_role]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("user_role", formData.user_role);
        data.append("valid", formData.valid);

        if (user_role) {
            data.append("_method", "PUT");
            router.post(`/user_roles/${user_role.id}`, data, {
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
            router.post("/user_roles", data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.massage || "Gagal Menambahkan Data");
                }
            });
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{ user_role ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">User Role</label>
                        <input
                            type="text"
                            name="user_role"
                            value={ formData.user_role }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Valid</label>
                        <input
                            type="checkbox"
                            name="valid"
                            value={ formData.valid }
                            onChange={handleChange}
                            className="border rounded p-2"
                            required
                            />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ user_role ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
