import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import UserManagementFormModal from "@/components/UserManagementModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user_managements',
    },
];

export default function UserManagement() {

    const { user_managements } = usePage<{ user_managements: {
        id: number;
        user_number: number;
        user_name: string;
        role: string;
        sex: string;
        contact_information: number;
        valid: string;
    }[]}>().props;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedUserManagement, setSelectedUserManagement ] = useState(null);

    const [searchUserNumber, setSearchUserNumber] = useState("");
    const [searchUserName, setSearchUserName] = useState("");
    const [searchRole, setSearchRole] = useState("");

    const openModal = (user_management = null) => {
        setSelectedUserManagement(user_management);
        setIsModalOpen(true);
    }

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleSelectAll = () => {
        if (isAllChecked) {
            setCheckedItems([]);
        } else {
            setCheckedItems(user_managements.map((item) => item.id));
        }
        setIsAllChecked(!isAllChecked);
    };

    const handleCheckboxChange = (id: number) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    const filteredData = user_managements.filter((user) => {
        return (
            (searchUserNumber === "" || user.user_number.toString().includes(searchUserNumber)) &&
            (searchUserName === "" || user.user_name.toLowerCase().includes(searchUserName.toLowerCase())) &&
            (searchRole === "" || user.role.toLowerCase().includes(searchRole.toLowerCase()))
        );
    });

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = user_managements.slice(startIndex, startIndex + recordsPerPage);

    const totalPages = Math.ceil(user_managements.length / recordsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="User Management"/>

                    <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">

                        <div className="flex justify-end">
                            <div className="flex flex-warp gap-4">
                                <input
                                    type="text"
                                    placeholder="Search by User Number"
                                    value={searchUserNumber}
                                    onChange={(e) => setSearchUserNumber(e.target.value)}
                                    className="border px-3 py-1 rounded w-1/3"
                                />
                                <input
                                    type="text"
                                    placeholder="Search by User Name"
                                    value={searchUserName}
                                    onChange={(e) => setSearchUserName(e.target.value)}
                                    className="border px-3 py-1 rounded w-1/3"
                                />
                                <input
                                    type="text"
                                    placeholder="Search by Role"
                                    value={searchRole}
                                    onChange={(e) => setSearchRole(e.target.value)}
                                    className="border px-3 py-1 rounded w-1/3"
                                />

                                <button onClick={() => openModal()} className=" bg-green-600 text-white rounded w-50 px-5 py-1 text-sm hover:bg-green-700 transition">
                                    Tambah Data
                                </button>
                            </div>
                        </div>

                        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-800 boder-b">
                                    <th className="border p-3 text-left w-10">
                                        <input
                                            type="checkbox"
                                            checked={isAllChecked}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    {["#", "User Num", "User Name", "Role", "Sex", "Contact Information", "Valid", "Action"].map((header) => (
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
                                    paginatedData.map((user_management, index) => (
                                        <tr key={user_management.id} className="border-b">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedItems.includes(user_management.id)}
                                                    onChange={() => handleCheckboxChange(user_management.id)}
                                                />
                                            </td>
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{user_management.user_number}</td>
                                            <td className="p-3">{user_management.user_name}</td>
                                            <td className="p-3">{user_management.role}</td>
                                            <td className="p-3">{user_management.sex}</td>
                                            <td className="p-3">{user_management.contact_information}</td>
                                            <td className="p-3">{user_management.valid}</td>
                                            <td className="py-3 justify-center flex gap-2">
                                                <button onClick={() => openModal(user_management)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
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

                        <UserManagementFormModal
                            isOpen={isModalOpen}
                            closeModal={() => setIsModalOpen(false)}
                            user_management={selectedUserManagement}
                        />
                    </div>
        </AppLayout>
    );

}
