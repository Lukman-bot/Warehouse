import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import UserRoleFormModal from "@/components/UserRoleModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Role',
        href: '/user_roles',
    },
];

export default function UserRole() {

    const { user_roles } = usePage<{ user_roles: {
        id: number;
        user_role: string;
        valid: string;
    }[]}>().props;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedUserRole, setSelectedUserRole ] = useState(null);

    const openModal = (user_role = null) => {
        setSelectedUserRole(user_role);
        setIsModalOpen(true);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = user_roles.slice(startIndex, startIndex + recordsPerPage);

    const totalPages = Math.ceil(user_roles.length / recordsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Role"/>

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">

                <div className="flex justify-end">
                    <button onClick={() => openModal()} className=" bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
                        Tambah Data
                    </button>
                </div>

                <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 boder-b">
                            {["#", "User Role", "Valid", "Action"].map((header) => (
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
                        paginatedData.map((user_role, index) => (
                            <tr key={user_role.id} className="border-b">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{user_role.user_role}</td>
                                <td className="p-3">{user_role.valid}</td>
                                <td className="py-3 justify-center flex gap-2">
                                    <button onClick={() => openModal(user_role)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
                                    <button className="bg-red-500 text-sm text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center p-4">Tidak ada data</td>
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

                <UserRoleFormModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    user_role={selectedUserRole}
                />
            </div>
        </AppLayout>
    )
}
