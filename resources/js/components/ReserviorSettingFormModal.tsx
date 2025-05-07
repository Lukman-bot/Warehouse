import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface ReserviorSetting {
    id?: number;
    warehouse_name: string;
    reservior_name: string;
    reservior_category: string;
    valid: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    reservior_setting?: ReserviorSetting | null;
}

export default function ReserviorSettingFormModal({ isOpen, closeModal, reservior_setting }: Props) {
    const [formData, setFormData] = useState<ReserviorSetting>({
        warehouse_name: "",
        reservior_name: "",
        reservior_category: "",
        valid: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (reservior_setting) {
            setFormData({
                warehouse_name: reservior_setting.warehouse_name,
                reservior_name: reservior_setting.reservior_name,
                reservior_category: reservior_setting.reservior_category,
                valid: reservior_setting.valid,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                warehouse_name: "",
                reservior_name: "",
                reservior_category: "",
                valid: "",
            });
            setSelectedFile(null);
        }
    }, [reservior_setting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLOptionElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("warehouse_name", formData.warehouse_name);
        data.append("reservior_name", formData.reservior_name);
        data.append("reservior_category", formData.reservior_category);
        data.append("valid", formData.valid);

        if (reservior_setting) {
            data.append("_method", "PUT");
            router.post(`/reservior_settings/${reservior_setting.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Gagal Menambahkan Data");
                }
            });
        } else {
            router.post("/reservior_settings", data, {
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opareservior_name-15 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{ reservior_setting ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Warehouse Name</label>
                        <select
                            name=""
                            id=""
                            className="w-full border rounded p-2"
                            >
                            <option value="">-- Pilih Warehouse --</option>
                            <option value="Warehouse 1">Warehouse 1</option>
                            <option value="Warehouse 2">Warehouse 2</option>
                            <option value="Warehouse 3">Warehouse 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Reservior Name</label>
                        <input
                            type="text"
                            name="reservior_name"
                            value={ formData.reservior_name }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Reservior Category</label>
                        <select
                            name=""
                            id=""
                            className="w-full border rounded p-2"
                            >
                            <option value="">-- Pilih Reservior --</option>
                            <option value="Reservior 1">Reservior 1</option>
                            <option value="Reservior 2">Reservior 2</option>
                            <option value="Reservior 3">Reservior 3</option>
                        </select>
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
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ reservior_setting ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
