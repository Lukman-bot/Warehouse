import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface LocationSetting {
    id?: number;
    reservior_name: string;
    reservior_category: string;
    location_code: number;
    location_lenght: number;
    location_width: number;
    location_height: number;
    location_volume: number;
    location_load: number;
    roadway_number: string;
    shelf_number: string;
    layer_number: string;
    tag_number: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    location_setting?: LocationSetting | null;
}

export default function LocationSettingFormModal({ isOpen, closeModal, location_setting }: Props) {
    const [formData, setFormData] = useState<LocationSetting>({
        reservior_name: "",
        reservior_category: "",
        location_code: 0,
        location_lenght: 0,
        location_width: 0,
        location_height: 0,
        location_volume: 0,
        location_load: 0,
        roadway_number: "",
        shelf_number: "",
        layer_number: "",
        tag_number: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (location_setting) {
            setFormData({
                reservior_name: location_setting.reservior_name,
                reservior_category: location_setting.reservior_category,
                location_code: location_setting.location_code,
                location_lenght: location_setting.location_lenght,
                location_width: location_setting.location_width,
                location_height: location_setting.location_height,
                location_volume: location_setting.location_volume,
                location_load: location_setting.location_load,
                roadway_number: location_setting.roadway_number,
                shelf_number: location_setting.shelf_number,
                layer_number: location_setting.layer_number,
                tag_number: location_setting.tag_number,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                reservior_name: "",
                reservior_category: "",
                location_code: 0,
                location_lenght: 0,
                location_width: 0,
                location_height: 0,
                location_volume: 0,
                location_load: 0,
                roadway_number: "",
                shelf_number: "",
                layer_number: "",
                tag_number: "",
            });
            setSelectedFile(null);
        }
    }, [location_setting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLOptionElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("reservior_name", formData.reservior_name);
        data.append("reservior_category", formData.reservior_category);
        data.append("location_code", formData.location_code.toString());
        data.append("location_lenght", formData.location_lenght.toString());
        data.append("location_width", formData.location_width.toString());
        data.append("location_height", formData.location_height.toString());
        data.append("location_volume", formData.location_volume.toString());
        data.append("location_load", formData.location_load.toString());
        data.append("roadway_number", formData.roadway_number);
        data.append("shelf_number", formData.shelf_number);
        data.append("layer_number", formData.layer_number);
        data.append("tag_number", formData.tag_number);

        if (location_setting) {
            data.append("_method", "PUT");
            router.post(`/location_settings/${location_setting.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Gagal Menambahkan Data");
                }
            });
        } else {
            router.post("/location_settings", data, {
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
                <h2 className="text-lg font-semibold mb-4">{ location_setting ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Reservior Name</label>
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
                        <label className="block text-sm font-medium" htmlFor="">Reservior Category</label>
                        <select
                            name=""
                            id=""
                            className="w-full border rounded p-2"
                            >
                            <option value="">-- Pilih Reservior Category --</option>
                            <option value="Reservior_Category 1">Reservior Category 1</option>
                            <option value="Reservior_Category 2">Reservior Category 2</option>
                            <option value="Reservior_Category 3">Reservior Category 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Location Code</label>
                        <input
                            type="number"
                            name="location_code"
                            value={ formData.location_code }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Location Lenght</label>
                        <input
                            type="number"
                            name="location_lenght"
                            value={ formData.location_lenght }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Location Width</label>
                        <input
                            type="number"
                            name="location_width"
                            value={ formData.location_width }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Location Height</label>
                        <input
                            type="number"
                            name="location_height"
                            value={ formData.location_height }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Location Volume</label>
                        <input
                            type="number"
                            name="location_volume"
                            value={ formData.location_volume }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Location Load</label>
                        <input
                            type="number"
                            name="location_load"
                            value={ formData.location_load }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Roadway Number</label>
                        <input
                            type="text"
                            name="roadway_number"
                            value={ formData.roadway_number }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Shelf Number</label>
                        <input
                            type="text"
                            name="shelf_number"
                            value={ formData.shelf_number }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Layer Number</label>
                        <input
                            type="text"
                            name="layer_number"
                            value={ formData.layer_number }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Tag Number</label>
                        <input
                            type="text"
                            name="tag_number"
                            value={ formData.tag_number }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ location_setting ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
