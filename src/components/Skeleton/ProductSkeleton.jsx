import React from "react";

import { Card } from "@material-tailwind/react";
const ProductSkeleton = () => {
    const TABLE_HEAD = [
        "Name",
        "Description",
        "price",
        "image",
        "Category",
        "SubCategory",
        "Actions",
    ];

    return (
        <div>
            <Card className="h-[875px] mt-10 w-full overflow-y-scroll">
                <table className="w-full text-center">
                    <thead className="sticky top-0 z-10">
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={index}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <div className="h-5 w-24 bg-gray-300 animate-pulse rounded"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10)].map((_, index) => (
                            <tr key={index}>
                                {[...Array(6)].map((_, idx) => (
                                    <td
                                        key={idx}
                                        className="p-4 border-b border-blue-gray-50 text-center"
                                    >
                                        <div className="h-4 w-32 bg-gray-300 animate-pulse rounded"></div>
                                    </td>
                                ))}
                                <td className="p-4 border-b border-blue-gray-50 text-center">
                                    <div className="flex items-center gap-x-3 justify-center">
                                        <div className="h-8 w-16 bg-gray-300 animate-pulse rounded"></div>
                                        <div className="h-8 w-16 bg-gray-300 animate-pulse rounded"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ProductSkeleton;
