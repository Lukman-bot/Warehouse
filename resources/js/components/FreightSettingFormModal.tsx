import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface FreightSetting {
    id?: number;
    carrier: string;
    depature_city: string;
    arrival_city: string;
    weight_fee: number;
    volume_fee: number;
    minimal_payment: number;
    valid: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    freight_setting?: FreightSetting | null;
}

export default function FreightSettingFormModal({ isOpen, closeModal, freight_setting }: Props) {
    const [formData, setFormData] = useState<FreightSetting>({
        carrier: "",
        depature_city: "",
        arrival_city: "",
        weight_fee: 0,
        volume_fee: 0,
        minimal_payment: 0,
        valid: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (freight_setting) {
            setFormData({
                carrier: freight_setting.carrier,
                depature_city: freight_setting.depature_city,
                arrival_city: freight_setting.arrival_city,
                weight_fee: freight_setting.weight_fee,
                volume_fee: freight_setting.volume_fee,
                minimal_payment: freight_setting.minimal_payment,
                valid: freight_setting.valid,
            });
            setSelectedFile(null);
        } else {
            setFormData({
                carrier: "",
                depature_city: "",
                arrival_city: "",
                weight_fee: 0,
                volume_fee: 0,
                minimal_payment: 0,
                valid: "",
            });
            setSelectedFile(null);
        }
    }, [freight_setting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("carrier", formData.carrier);
        data.append("depature_city", formData.depature_city);
        data.append("arrival_city", formData.arrival_city);
        data.append("weight_fee", formData.weight_fee.toString());
        data.append("volume_fee", formData.volume_fee.toString());
        data.append("minimal_payment", formData.minimal_payment.toString());
        data.append("valid", formData.valid);

        if (freight_setting) {
            data.append("_method", "PUT");
            router.post(`/freight_settings/${freight_setting.id}`, data, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Gagal Menambahkan Data");
                }
            });
        } else {
            router.post("/freight_settings", data, {
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacarrier-15 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-lg font-semibold mb-4">{ freight_setting ? "Edit Data"  : "Add Data" }</h2>
                <form onSubmit={ handleSubmit } encType="multipart/form-data" action="">
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Carrier</label>
                        <input
                            type="text"
                            name="carrier"
                            value={ formData.carrier }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Depature City</label>
                        <input
                            type="text"
                            name="depature_city"
                            value={ formData.depature_city }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Weight Fee</label>
                        <input
                            type="number"
                            name="weight_fee"
                            value={ formData.weight_fee }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Volume Fee</label>
                        <input
                            type="number"
                            name="volume_fee"
                            value={ formData.volume_fee }
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium" htmlFor="">Minimal Payment</label>
                        <input
                            type="number"
                            name="minimal_payment"
                            value={ formData.minimal_payment }
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
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{ freight_setting ? "Ubah" : "Input" }</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
