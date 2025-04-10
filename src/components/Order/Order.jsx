import React from "react";
import { Link } from "react-router-dom";
import {
    useDeleteOrderMutation,
    useGetAllOrderQuery,
} from "../../Features/Api/exclusive.api";
import { successToast } from "../../Utils/Toast";

const Order = () => {
    // ================ gat all order data =====================
    const { data } = useGetAllOrderQuery();
    // console.log(data?.data?.orders);

    // ================= delete order function ==============

    const [DeleteOrder] = useDeleteOrderMutation();

    const handleDeleteOrder = async (id) => {
        try {
            const responce = await DeleteOrder(id);

            if(responce?.data?.data){
              successToast("order deleted successfully")
            }
        } catch (error) {
            console.log("error from order delete", error);
        }
    };

    return (
        <div>
            <div class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 font-sans font-semibold">
                <div class="mx-auto max-w-[76vw] px-4 2xl:px-0">
                    <div class="mx-auto w-full">
                        <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                My orders
                            </h2>

                            <div class="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                                <div>
                                    <label
                                        for="order-type"
                                        class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Select order type
                                    </label>
                                    <select
                                        id="order-type"
                                        class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    >
                                        <option selected>All orders</option>
                                        <option value="pre-order">
                                            Pre-order
                                        </option>
                                        <option value="transit">
                                            In transit
                                        </option>
                                        <option value="confirmed">
                                            Confirmed
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>

                               
                            </div>
                        </div>

                        <div class="mt-6 flow-root sm:mt-8 h-[75vh] overflow-y-scroll">
                            <div class="divide-y divide-gray-200 dark:divide-gray-700">
                                {data?.data?.orders.map((order, index) => (
                                    <div class="flex flex-wrap items-center gap-y-4 py-6 mr-10">
                                        <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                                                Order ID:
                                            </dt>
                                            <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                <a
                                                    href="#"
                                                    class="hover:underline"
                                                >
                                                    #{order._id.slice(0, 8)}
                                                </a>
                                            </dd>
                                        </dl>

                                        <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                                                Total Item:
                                            </dt>
                                            <dd class="mt-1.5 text-base font-semibold ps-4 text-gray-900 dark:text-white">
                                                {order.totalitem}
                                            </dd>
                                        </dl>

                                        <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                                                Total Price:
                                            </dt>
                                            <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                {order.subtotal}BDT
                                            </dd>
                                        </dl>

                                        <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                                                Status:
                                            </dt>
                                            <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                                <svg
                                                    class="me-1 h-3 w-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                                    />
                                                </svg>
                                                {order.status}
                                            </dd>
                                        </dl>

                                        <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteOrder(order._id)
                                                }
                                                class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                                            >
                                                Cancel order
                                            </button>
                                            <Link
                                                to={`/order/${order._id}`}
                                                class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                            >
                                                View details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
