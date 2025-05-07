import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import OwnerInformationFormModal from "@/components/OwnerInformationFormModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Owner Information',
        href: '/owner_informations',
    },
];

export default function OwnerInformation() {
    const { owner_informations } = usePage<{ owner_informations: {
        id: number;
        owner_of_cargo: string;
        city: string;
        address: string;
        person_in_charge: string;
        contact_information: string;
    }[]}>().props;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedOwnerInformation, setSelectedOwnerInformation ] = useState(null);

    const [searchOwner, setSearchOwner] = useState("");

    const openModal = (owner_information = null) => {
        setSelectedOwnerInformation(owner_information);
        setIsModalOpen(true);
    }

    const filteredData = owner_informations.filter((owner) => {
        return (
            (searchOwner === "" || owner.owner_of_cargo.toLowerCase().includes(searchOwner.toLowerCase()))
        );
    });

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = owner_informations.slice(startIndex, startIndex + recordsPerPage);

    const totalPages = Math.ceil(owner_informations.length / recordsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Owner Information"/>

                    <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">

                        <div className="flex justify-end">
                            <div className="flex flex-warp gap-4 w-60 me-3">
                                <input
                                    type="text"
                                    placeholder="Search Owner Of Cargo"
                                    value={searchOwner}
                                    onChange={(e) => setSearchOwner(e.target.value)}
                                    className="border px-3 py-1 rounded w-60"
                                />

                            </div>
                                <button onClick={() => openModal()} className=" bg-green-600 text-white rounded w-50 px-5 py-1 text-sm hover:bg-green-700 transition">
                                    Tambah Data
                                </button>
                        </div>

                        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-800 boder-b">
                                    {["#", "Owen Of Cargo", "City", "Address", "Person in Charge", "Contact Information", "Action"].map((header) => (
                                        <th
                                            key={header}
                                            className={`border p-3 text-left ${
                                                header === "#" ? "w-10" : header === "Action" ? "w-40" : ""
                                            }`}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length ? (
                                    paginatedData.map((owner_information, index) => (
                                        <tr key={owner_information.id} className="border-b">
                                            <td className="p-3">{startIndex + index + 1}</td>
                                            <td className="p-3">{owner_information.owner_of_cargo}</td>
                                            <td className="p-3">{owner_information.city}</td>
                                            <td className="p-3">{owner_information.address}</td>
                                            <td className="p-3">{owner_information.person_in_charge}</td>
                                            <td className="p-3">{owner_information.contact_information}</td>
                                            <td className="py-3 justify-center flex gap-2">
                                                <button onClick={() => openModal(owner_information)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
                                                <button className="bg-red-500 text-sm text-white px-3 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center p-4 text-gray-600">Tidak Ada Data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="px-3 py-1 bg-gray-300 rounded"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className="px-3 py-1 bg-gray-300 rounded"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>

                    <OwnerInformationFormModal
                        isOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        owner_information={selectedOwnerInformation}
                        />
                </div>

        </AppLayout>
    );
}
