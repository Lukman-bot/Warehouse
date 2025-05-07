import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import FreightSettingFormModal from "@/components/FreightSettingFormModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Freight Setting',
        href: '/freight_settings',
    },
];

export default function FreightSetting() {
    const { freight_setting } = usePage<{ freight_setting: {
        id: number;
        carrier: string;
        depature_city: string;
        arrival_city: string;
        creator: string;
        created_at: string;
        valid: string;
    }[]}>().props;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedFreightSetting, setSelectedFreightSetting ] = useState(null);

    const [searchDepatureCity, setSearchDepatureCity] = useState("");
    const [searchArrivalCity, setSearchArrivalCity] = useState("");

    const openModal = (freight_setting = null) => {
        setSelectedFreightSetting(freight_setting);
        setIsModalOpen(true);
    }

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleSelectAll = () => {
        if (isAllChecked) {
            setCheckedItems([]);
        } else {
            setCheckedItems(freight_setting.map((item) => item.id));
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

    const filteredData = freight_setting.filter((user) => {
        return (
            (searchDepatureCity === "" || user.depature_city.toLowerCase().includes(searchDepatureCity.toLowerCase())) &&
            (searchArrivalCity === "" || user.arrival_city.toLowerCase().includes(searchArrivalCity.toLowerCase()))
        );
    });

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = freight_setting.slice(startIndex, startIndex + recordsPerPage);

    const totalPages = Math.ceil(freight_setting.length / recordsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Freight Setting" />

                    <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">

                        <div className="flex justify-end">
                            <div className="flex flex-warp gap-4">
                                <input
                                    type="text"
                                    placeholder="Search by User Name"
                                    value={searchDepatureCity}
                                    onChange={(e) => setSearchDepatureCity(e.target.value)}
                                    className="border px-3 py-1 rounded w-1/3"
                                />
                                <input
                                    type="text"
                                    placeholder="Search by Role"
                                    value={searchArrivalCity}
                                    onChange={(e) => setSearchArrivalCity(e.target.value)}
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
                                    {["#", "Carrier", "Depature City", "Arrival City", "Creator", "Created At", "Valid", "Action"].map((header) => (
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
                                    paginatedData.map((freight_setting, index) => (
                                        <tr key={freight_setting.id} className="border-b">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedItems.includes(freight_setting.id)}
                                                    onChange={() => handleCheckboxChange(freight_setting.id)}
                                                />
                                            </td>
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{freight_setting.carrier}</td>
                                            <td className="p-3">{freight_setting.depature_city}</td>
                                            <td className="p-3">{freight_setting.arrival_city}</td>
                                            <td className="p-3">{freight_setting.creator}</td>
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
                                                        }).format(new Date(freight_setting.created_at))}
                                                    </td>
                                            <td className="p-3">{freight_setting.valid}</td>
                                            <td className="py-3 justify-center flex gap-2">
                                                <button onClick={() => openModal(freight_setting)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
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
                        <FreightSettingFormModal
                            isOpen={isModalOpen}
                            closeModal={() => setIsModalOpen(false)}
                            freight_setting={selectedFreightSetting}
                        />
                    </div>
        </AppLayout>
    );

}
