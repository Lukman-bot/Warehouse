import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface RoleMenuSetting {
    id?: number;
    role_name: string;
    menu_name: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    role_menu_setting?: RoleMenuSetting | null;
}

export default function RoleMenuSettingModal({ isOpen, closeModal, role_menu_setting }: Props) {
    const [formData, setFormData] = useState<RoleMenuSetting>({ role_name: "", menu_name: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (role_menu_setting) {
            setFormData({
                role_name: role_menu_setting.role_name,
                menu_name: role_menu_setting.menu_name,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                role_name: "",
                menu_name: "",
            });
            setSelectedFile(null);
        }
    }, [role_menu_setting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("role_name", formData.role_name);
        data.append("menu_name", formData.menu_name);

        if (role_menu_setting) {
            data.append("_method", "PUT");
            router.post(`/role_menu_settings/${role_menu_setting.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Gagal Menambahkan Data");
                }
            });
        } else {
            router.post("/role_menu_settings", data, {
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
                <h2 className="text-lg font-semibold mb-4">{ role_menu_setting ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Role Name</label>
                        <input
                            type="text"
                            name="role_name"
                            value={ formData.role_name }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Menu Name</label>
                        <input
                            type="text"
                            name="menu_name"
                            value={ formData.menu_name }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ role_menu_setting ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
