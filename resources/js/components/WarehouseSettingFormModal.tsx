import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface WarehouseSetting {
    id?: number;
    warehouse_name: string;
    city: string;
    address: string;
    acontact_telephone: string;
    email: string;
    manager: string;
    valid: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    warehouse_setting?: WarehouseSetting | null;
}

export default function WarehouseSettingFormModal({ isOpen, closeModal, warehouse_setting }: Props) {
    const [formData, setFormData] = useState<WarehouseSetting>({
        warehouse_name: "",
        city: "",
        address: "",
        acontact_telephone: "",
        email: "",
        manager: "",
        valid: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (warehouse_setting) {
            setFormData({
                warehouse_name: warehouse_setting.warehouse_name,
                city: warehouse_setting.city,
                address: warehouse_setting.address,
                acontact_telephone: warehouse_setting.acontact_telephone,
                email: warehouse_setting.email,
                manager: warehouse_setting.manager,
                valid: warehouse_setting.valid,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                warehouse_name: "",
                city: "",
                address: "",
                acontact_telephone: "",
                email: "",
                manager: "",
                valid: "",
            });
            setSelectedFile(null);
        }
    }, [warehouse_setting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("warehouse_name", formData.warehouse_name);
        data.append("city", formData.city);
        data.append("address", formData.address);
        data.append("acontact_telephone", formData.acontact_telephone);
        data.append("email", formData.email);
        data.append("manager", formData.manager);
        data.append("valid", formData.valid);

        if (warehouse_setting) {
            data.append("_method", "PUT");
            router.post(`/warehouse_settings/${warehouse_setting.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Gagal Menambahkan Data");
                }
            });
        } else {
            router.post("/warehouse_settings", data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Gagal Menambahkan Data");
                }
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{ warehouse_setting ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Warehouse Name</label>
                        <input
                            type="text"
                            name="warehouse_name"
                            value={ formData.warehouse_name }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">City</label>
                        <input
                            type="text"
                            name="city"
                            value={ formData.city }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required>
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Acontact Tel</label>
                        <input
                            type="text"
                            name="acontact_telephone"
                            value={ formData.acontact_telephone }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={ formData.email }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Manager</label>
                        <input
                            type="text"
                            name="manager"
                            value={ formData.manager }
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
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ warehouse_setting ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
