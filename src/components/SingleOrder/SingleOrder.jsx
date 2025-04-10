import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useGetSingleOrderQuery,
    useUpdateOrderStatusMutation,
} from "../../Features/Api/exclusive.api";
import { calculateDiscount } from "../../Helpers/discountPrice";
import { Option, Select } from "@material-tailwind/react";
import { errorToast, successToast } from "../../Utils/Toast";

const SingleOrder = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    // console.log(id);

    // ================== get single order =====================

    const { data } = useGetSingleOrderQuery(id);
    // console.log(data?.data?.order);

    // ============== order status ===============

    const [UpdateOrderStatus] = useUpdateOrderStatusMutation();

    const [status, setstatus] = useState([
        "pending",
        "cancled",
        "processing",
        "deliverd",
    ]);

    const [finalStatus, setfinalStatus] = useState({
        status: "",
    });

    const handleUpdateStatus = async () => {
        try {
            const responce = await UpdateOrderStatus({
                data: finalStatus,
                id: id,
            });

            if (responce?.data?.data) {
                successToast("order status updated successfully");
            } else {
                errorToast("failed to update order status");
            }
        } catch (error) {
            console.log("error from order status update", error);
        } finally {
            setfinalStatus({
                status: "",
            });
            navigate("/order")
        }
    };
    // console.log(finalStatus);

    return (
        <div>
            <div class="py-14 px-4 ">
                <div class="flex justify-start item-start space-y-2 flex-col">
                    <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                        Order #{data?.data?.order?._id.slice(0, 8)}
                    </h1>
                    {/* <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                        21st Mart 2021 at 10:34 PM
                    </p>  */}
                </div>

                <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        {/* ================== */}
                        <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                Customer’s Cart
                            </p>

                            {/* ================= order array */}
                            {data?.data?.order?.purchasedCart.map(
                                (item, index) => {
                                    // Call the function and store the result in a variable
                                    const discountPrice = calculateDiscount(
                                        item?.product?.price,
                                        item?.product?.discount
                                    ).toFixed(2);
                                    return (
                                        <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                            <div class="pb-4 md:pb-8 w-full md:w-40">
                                                <img
                                                    class="w-full hidden md:block"
                                                    src={
                                                        item?.product?.image[0]
                                                    }
                                                    alt="product"
                                                />
                                            </div>
                                            <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 class="text-xl truncate dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                        {item?.product?.name}
                                                    </h3>
                                                    <div class="flex justify-start items-start flex-col space-y-2">
                                                        <p class="text-sm truncate dark:text-white leading-none text-gray-800">
                                                            <span class="dark:text-gray-400 text-gray-300">
                                                                Description:
                                                            </span>

                                                            {item?.product
                                                                ?.description
                                                                ? item?.product
                                                                      ?.description
                                                                : "Default"}
                                                        </p>
                                                        <p class="text-sm dark:text-white leading-none text-gray-800">
                                                            <span class="dark:text-gray-400 text-gray-300">
                                                                Size:
                                                            </span>
                                                            {item?.size
                                                                ? item?.size
                                                                : "Default"}
                                                        </p>
                                                        <p class="text-sm dark:text-white leading-none text-gray-800">
                                                            <span class="dark:text-gray-400 text-gray-300">
                                                                Color:{" "}
                                                            </span>{" "}
                                                            {item?.color
                                                                ? item?.color
                                                                : "Default"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between items-start w-full">
                                                    <div className="">
                                                        <p class="text-base dark:text-white xl:text-lg  truncate w-[100px]">
                                                            ${discountPrice}
                                                        </p>

                                                        <span class="text-red-300 line-through">
                                                            {" "}
                                                            $
                                                            {
                                                                item?.product
                                                                    ?.price
                                                            }
                                                        </span>
                                                    </div>
                                                    <p class="text-base dark:text-white xl:text-lg  text-gray-800 ">
                                                        {item?.quantity <= 9
                                                            ? `0${item.quantity}`
                                                            : item.quantity}
                                                    </p>
                                                    <div className=" ">
                                                        <p class="text-base w-[100px] truncate dark:text-white xl:text-lg font-semibold text-gray-800">
                                                            $
                                                            {item?.quantity *
                                                                discountPrice}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}

                            {/* =================================== */}
                        </div>
                        <div class="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                    Summary
                                </h3>
                                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div class="flex justify-between w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">
                                            Subtotal
                                        </p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                            ${data?.data?.order?.subtotal}
                                        </p>
                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">
                                            Total Item
                                        </p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                            {data?.data?.order?.totalitem}
                                        </p>
                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">
                                            Shipping
                                        </p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                            $8.00
                                        </p>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                                        Total
                                    </p>
                                    <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                        ${data?.data?.order?.subtotal + 8}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                    Shipping Status
                                </h3>
                                <div class="flex justify-between items-start w-full">
                                    <div class="flex justify-center items-center space-x-4">
                                        <div class="w-8 h-8">
                                            <img
                                                class="w-full h-full"
                                                alt="logo"
                                                src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                            />
                                        </div>
                                        <div class="flex flex-col justify-start items-center">
                                            <Select
                                                label="Select Status"
                                                onChange={(e) =>
                                                    setfinalStatus({
                                                        ...finalStatus,
                                                        status: e,
                                                    })
                                                }
                                                className="w-full py-2 px-1"
                                            >
                                                {status.map((item) => (
                                                    <Option
                                                        value={item}
                                                        className="capitalize"
                                                    >
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                                        $8.00
                                    </p>
                                </div>
                                <div class="w-full flex justify-center items-center">
                                    <button
                                        onClick={handleUpdateStatus}
                                        class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                                    >
                                        Confirm Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===================== user info =================== */}
                    <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            Customer
                        </h3>
                        <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div class="flex flex-col justify-start items-start flex-shrink-0">
                                <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <img
                                        src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                                        alt="avatar"
                                    />
                                    <div class="flex justify-start items-start flex-col space-y-2">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                                            {data?.data?.order?.user?.firstName}
                                        </p>
                                        <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">
                                            {
                                                data?.data?.order?.user
                                                    ?.purchasedCart.length
                                            }{" "}
                                            Previous Orders
                                        </p>
                                    </div>
                                </div>

                                <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M3 7L12 13L21 7"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <p class="cursor-pointer text-sm leading-5 ">
                                        {data?.data?.order?.user?.email}
                                    </p>
                                </div>
                            </div>
                            <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                            Shipping Address
                                        </p>
                                        <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.address1
                                            }{" "}
                                            ,{" "}
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.address2
                                            }{" "}
                                            ,
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.district
                                            }{" "}
                                            ,{" "}
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.postalcode
                                            }
                                        </p>
                                    </div>
                                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                            Billing Address
                                        </p>
                                        <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.address1
                                            }{" "}
                                            ,{" "}
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.address2
                                            }{" "}
                                            ,
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.district
                                            }{" "}
                                            ,{" "}
                                            {
                                                data?.data?.order?.customerinfo
                                                    ?.postalcode
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div class="flex w-full justify-center items-center md:justify-start md:items-start">
                                    <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleOrder;
