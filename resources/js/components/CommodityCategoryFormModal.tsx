import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface CommodityCategory {
    id?: number;
    commodity_category: string;
    creator: string;
    created_at: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    commodity_category?: CommodityCategory | null;
}

export default function CommodityCategoryFormModal({ isOpen, closeModal, commodity_category }: Props) {
    const [formData, setFormData] = useState<CommodityCategory>({ commodity_category: "", creator: "", created_at: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (commodity_category) {
            setFormData({
                commodity_category: commodity_category.commodity_category,
                creator: commodity_category.creator,
                created_at: commodity_category.created_at,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                commodity_category: "",
                creator: "",
                created_at: "",
            });
            setSelectedFile(null);
        } 
    }, [commodity_category]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("commodity_category", formData.commodity_category);
        data.append("creator", formData.creator);
        data.append("created_at", formData.created_at);

        if (commodity_category) {
            data.append("_method", "PUT");
            router.post(`/commodity_categories/${commodity_category.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Failed to update data");
                }
            });
        } else {
            router.post("/commodity_categories", data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Failed to add data");
                }
            });
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{ commodity_category ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Commodity Category</label>
                        <input
                            type="text"
                            name="commodity_category"
                            value={ formData.commodity_category }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Creator</label>
                        <input
                            type="text"
                            name="creator"
                            value={ formData.creator }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Created At</label>
                        <input
                            type="text"
                            name="created_at"
                            value={ formData.created_at }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ commodity_category ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
