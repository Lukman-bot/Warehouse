import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface OwnerInformation {
    id?: number;
    owner_of_cargo: string;
    city: string;
    address: string;
    person_in_charge: string;
    contact_information: string;
}

interface OwnerInformationFormModalProps {
    isOpen: boolean;
    closeModal: () => void;
    owner_information?: OwnerInformation | null;
}

export default function OwnerInformationFormModal({ isOpen, closeModal, owner_information }: OwnerInformationFormModalProps) {
    const [formData, setFormData] = useState<OwnerInformation>({
        owner_of_cargo: "",
        city: "",
        address: "",
        person_in_charge: "",
        contact_information: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (owner_information) {
            setFormData({
                owner_of_cargo: owner_information.owner_of_cargo,
                city: owner_information.city,
                address: owner_information.address,
                person_in_charge: owner_information.person_in_charge,
                contact_information: owner_information.contact_information,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                owner_of_cargo: "",
                city: "",
                address: "",
                person_in_charge: "",
                contact_information: "",
            });
            setSelectedFile(null);
        }
    }, [owner_information]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("owner_of_cargo", formData.owner_of_cargo);
        data.append("city", formData.city);
        data.append("address", formData.address);
        data.append("person_in_charge", formData.person_in_charge);
        data.append("contact_information", formData.contact_information);

        if (owner_information) {
            data.append("_method", "PUT");
            router.post(`/owner_informations/${owner_information.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Failed to update data");
                },
            });
        } else {
            router.post("/owner_informations", data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Failed to create data");
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{ owner_information ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Owner Of Cargo</label>
                        <input
                            type="text"
                            name="owner_of_cargo"
                            value={ formData.owner_of_cargo }
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
                        <label className="block text-sm font-medium" htmlFor="">Person in Charge</label>
                        <input
                            type="text"
                            name="person_in_charge"
                            value={ formData.person_in_charge }
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
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ owner_information ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
