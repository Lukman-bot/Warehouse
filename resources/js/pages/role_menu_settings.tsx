import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import RoleMenuSettingModal from "@/components/RoleMenuSettingModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role Menu Settings',
        href: '/role_menu_settings',
    },
];

export default function RoleMenuSetting() {

    const { role_menu_settings } = usePage<{ role_menu_settings: {
        id: number;
        role_name: string;
        menu_name: string;
    }[]}>().props;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedRoleMenuSetting, setSelectedRoleMenuSetting ] = useState(null);

    const openModal = (role_menu_setting = null) => {
        setSelectedRoleMenuSetting(role_menu_setting);
        setIsModalOpen(true);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = role_menu_settings.slice(startIndex, startIndex + recordsPerPage);

    const totalPages = Math.ceil(role_menu_settings.length / recordsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Role Menu Setting"/>

                    <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">

                        <div className="flex justify-end">
                            <button onClick={() => openModal()} className=" bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
                                Tambah Data
                            </button>
                        </div>

                        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-800 boder-b">
                                    {["#", "Role Name", "Menu Name", "Action"].map((header) => (
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
                                    paginatedData.map((role_menu_setting, index) => (
                                        <tr key={role_menu_setting.id} className="border-b">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{role_menu_setting.role_name}</td>
                                            <td className="p-3">{role_menu_setting.menu_name}</td>
                                            <td className="py-3 justify-center flex gap-2">
                                                <button onClick={() => openModal(role_menu_setting)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
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

                        <RoleMenuSettingModal
                            isOpen={isModalOpen}
                            closeModal={() => setIsModalOpen(false)}
                            role_menu_setting={selectedRoleMenuSetting}
                        />
                    </div>
                </AppLayout>
    )

}
