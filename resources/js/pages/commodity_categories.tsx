import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import CommodityCategoryFormModal from "@/components/CommodityCategoryFormModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Commodity Category',
        href: '/commodity_categories',
    },
];

export default function CommodityCategory() {
    const { commodity_categories } = usePage<{ commodity_categories: {
        id: number;
        commodity_category: string;
        creator: string;
        created_at: string;
    }[]}>().props;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedCommodityCategory, setSelectedCommodityCategory ] = useState(null);

    const openModal = (commodity_category = null) => {
        setSelectedCommodityCategory(commodity_category);
        setIsModalOpen(true);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = commodity_categories.slice(startIndex, startIndex + recordsPerPage);

    const totalPages = Math.ceil(commodity_categories.length / recordsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                            <Head title="Commodity Category"/>

                            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">

                                <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-800 boder-b">
                                            {["#", "Commodity Category", "Creator", "Created At", "Action"].map((header) => (
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
                                            paginatedData.map((commodity_category, index) => (
                                                <tr key={commodity_category.id} className="border-b">
                                                    <td className="p-3">{index + 1}</td>
                                                    <td className="p-3">{commodity_category.commodity_category}</td>
                                                    <td className="p-3">{commodity_category.creator}</td>
                                                    <td className="p-3">
                                                        {new Intl.DateTimeFormat("id-ID", {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            second: "2-digit",
                                                            hour12: false,
                                                            timeZone: "Asia/Jakarta",
                                                        }).format(new Date(commodity_category.created_at))}
                                                    </td>
                                                    <td className="py-3 justify-center flex gap-2">
                                                        <button onClick={() => openModal(commodity_category)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
                                                        <button className="bg-red-500 text-sm text-white px-3 py-1 rounded">Delete</button>
                                                    </td>
                                                </tr>
                                            )) 
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center p-4">Tidak ada data</td>
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
                                <CommodityCategoryFormModal
                                    isOpen={isModalOpen}
                                    closeModal={() => setIsModalOpen(false)}
                                    commodity_category={selectedCommodityCategory}
                                    />
                            </div>
                </AppLayout>
    );
}
