import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface CompanyInfrormation {
    id?: number;
    corporate_name: string;
    city: string;
    address: string;
    person_in_charge: string;
    contact_information: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    company_information?: CompanyInfrormation | null;
}

export default function CompanyInfrormationFormModal ({ isOpen, closeModal, company_information }: Props) {
    const [ formData, setFormData ] = useState<CompanyInfrormation>({corporate_name: "", city: "", address: "", person_in_charge: "", contact_information: "",});
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    // const [ prview, setPreview ] = useState<string>("");

    useEffect(()=> {
        if (company_information) {
            setFormData({
                corporate_name: company_information.corporate_name,
                city: company_information.city,
                address: company_information.address,
                person_in_charge: company_information.person_in_charge,
                contact_information: company_information.contact_information || ""
            });
            setSelectedFile(null);
        }
        else {
            setFormData({
                corporate_name: "",
                city: "",
                address: "",
                person_in_charge: "",
                contact_information: ""
            });
            setSelectedFile(null);
        }
    }, [company_information]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("corporate_name", formData.corporate_name);
        data.append("city", formData.city);
        data.append("address", formData.address);
        data.append("person_in_charge", formData.person_in_charge);
        data.append("contact_information", formData.contact_information);

        if(company_information?.id) {
            data.append("_method", "PUT");
            router.post(`/c_info/${ company_information.id }`, data, {
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
            router.post('/c_info', data, {
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
                <h2 className="text-lg font-semibold mb-4">{ company_information ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Corporate Name</label>
                        <input
                            type="text"
                            name="corporate_name"
                            value={ formData.corporate_name }
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
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ company_information ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
