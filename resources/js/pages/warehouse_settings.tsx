import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import WarehouseSettingFormModal from "@/components/WarehouseSettingFormModal";
import ReserviorSettingFormModal from "@/components/ReserviorSettingFormModal";
import LocationSettingFormModal from "@/components/LocationSettingFormModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Warehouse Setting',
        href: '/warehouse_settings',
    }
];

export default function WarehouseSetting() {
    const { warehouse_settings } = usePage<{ warehouse_settings: {
        id: number;
        warehouse_name: string;
        city: string;
        address: string;
        acontact_telephone: string;
        email: string;
        manager: string;
        valid: string;
    }[]}>().props;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [ selectedWarehouseSetting, setSelectedWarehouseSetting ] = useState(null);

    const [searchWarehouse, setSearchWarehouse] = useState("");
    const [searchManager, setSearchManager] = useState("");

    const openModal = (modalName: string, warehouse_setting = null) => {
        setSelectedWarehouseSetting(warehouse_setting);
        setActiveModal(modalName);
        setIsModalOpen(true);
    };

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleSelectAll = () => {
        if (isAllChecked) {
            setCheckedItems([]);
        } else {
            setCheckedItems(warehouse_settings.map((item) => item.id));
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

    const filteredData = warehouse_settings.filter((warehouse) => {
        return (
            (searchWarehouse === "" || warehouse.warehouse_name.toLowerCase().includes(searchWarehouse.toLowerCase())) &&
            (searchManager === "" || warehouse.manager.toLowerCase().includes(searchManager.toLowerCase()))
        );
    });

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = warehouse_settings.slice(startIndex, startIndex + recordsPerPage);

    const totalPages = Math.ceil(warehouse_settings.length / recordsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                            <Head title="Warehouse Setting"/>

                            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
                            <div className="flex flex-wrap gap-3 items-center">
                                <button
                                    onClick={() => openModal("warehouse")}
                                    className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition rounded"
                                >
                                    Add Warehouse
                                </button>
                                <button
                                    onClick={() => openModal("reservoir")}
                                    className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition rounded"
                                >
                                    Add Reservoir
                                </button>
                                <button
                                    onClick={() => openModal("location")}
                                    className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition rounded"
                                >
                                    Add Location
                                </button>
                            </div>
                                <div className="flex justify-end">
                                    <div className="flex flex-warp gap-4">
                                    <input
                                        type="text"
                                        placeholder="Search by Warehouse Name"
                                        value={searchWarehouse}
                                        onChange={(e) => setSearchWarehouse(e.target.value)}
                                        className="border px-3 py-1 rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search by Manager"
                                        value={searchManager}
                                        onChange={(e) => setSearchManager(e.target.value)}
                                        className="border px-3 py-1 rounded"
                                    />
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
                                            {["#", "Warehouse Name", "City", "Address", "Acontact Tel", "Email", "Manager", "Valid", "Action"].map((header) => (
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
                                            paginatedData.map((warehouse_setting, index) => (
                                                <tr key={warehouse_setting.id} className="border-b">
                                                    <td className="p-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedItems.includes(warehouse_setting.id)}
                                                            onChange={() => handleCheckboxChange(warehouse_setting.id)}
                                                        />
                                                    </td>
                                                    <td className="p-3">{startIndex + index + 1}</td>
                                                    <td className="p-3">{warehouse_setting.warehouse_name}</td>
                                                    <td className="p-3">{warehouse_setting.city}</td>
                                                    <td className="p-3">{warehouse_setting.address}</td>
                                                    <td className="p-3">{warehouse_setting.acontact_telephone}</td>
                                                    <td className="p-3">{warehouse_setting.email}</td>
                                                    <td className="p-3">{warehouse_setting.manager}</td>
                                                    <td className="p-3">{warehouse_setting.valid}</td>
                                                    <td className="py-3 justify-center flex gap-2">
                                                        <button onClick={() => openModal(warehouse_setting)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
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
                                {activeModal === "warehouse" && (
                                    <WarehouseSettingFormModal
                                        isOpen={isModalOpen}
                                        closeModal={() => setIsModalOpen(false)}
                                        warehouse_setting={selectedWarehouseSetting}
                                    />
                                )}

                                {activeModal === "reservoir" && (
                                    <ReserviorSettingFormModal
                                        isOpen={isModalOpen}
                                        closeModal={() => setIsModalOpen(false)}
                                    />
                                )}

                                {activeModal === "location" && (
                                    <LocationSettingFormModal
                                        isOpen={isModalOpen}
                                        closeModal={() => setIsModalOpen(false)}
                                    />
                                )}
                            </div>
                        </AppLayout>
    );
}
