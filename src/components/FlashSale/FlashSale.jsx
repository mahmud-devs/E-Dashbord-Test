import { Button } from "@material-tailwind/react";
import React from "react";
import {
    useDeleteBestSellingMutation,
    useGetBestSellingQuery,
} from "../../Features/Api/exclusive.api";
import { successToast } from "../../Utils/Toast";

const FlashSale = () => {
    const {
        data: bestData,
        isLoading: bestLoading,
        isError: bestError,
    } = useGetBestSellingQuery();
    // console.log(bestData?.data);

    // ================ delete DeleteBestSelling ===============
    const [DeleteBestSelling] = useDeleteBestSellingMutation();
    const handleDelete = async (id) => {
        try {
            const responce = await DeleteBestSelling(id);
            if (responce?.data?.data) {
                successToast("product deleted from flash sale");
            }
        } catch (error) {
            console.log("error from flashsale", error);
        }
    };
    return (
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-[606px]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10    ">
                        <tr>
                            <th scope="col" class="p-4"></th>
                            <th scope="col" class="px-6 py-3 text-left">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3  text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestData?.data.map((item, index) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <label
                                            for="checkbox-table-search-3"
                                            class="sr-only"
                                        >
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item?.product?.name}
                                </th>
                                <td class="px-6 py-4">
                                    {item?.product?.rating}
                                </td>
                                <td class="px-6 py-4">
                                    {item?.product?.category[0]?.name
                                        ? item?.product?.category[0]?.name
                                        : "no category"}
                                </td>
                                <td class="px-6 py-4">
                                    ${item?.product?.price}
                                </td>
                                <td class="px-6 py-4">
                                    <div className="flex items-center gap-x-3 justify-center">
                                        <Button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            color="red"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlashSale;
