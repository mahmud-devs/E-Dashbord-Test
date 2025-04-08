import React, { useEffect, useState } from "react";
import {
    Textarea,
    Input,
    Card,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    useGetAllProductQuery,
    useGetBestSellingQuery,
} from "../../Features/Api/exclusive.api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToast, successToast } from "../../Utils/Toast";
import ProductSkeleton from "../Skeleton/ProductSkeleton";
const ProductList = () => {
    const navigate = useNavigate();

    const TABLE_HEAD = [
        "Name",
        "Description",
        "price",
        "image",
        "Category",
        "SubCategory",
        "Actions",
    ];
    // ======================= get bestselling ================
    const [bestDataId, setbestDataId] = useState([]);

    const {
        data: bestData,
        isLoading: bestLoading,
        isError: bestError,
    } = useGetBestSellingQuery();
    // console.log(bestData);

    useEffect(() => {
        if (bestData?.data) {
            const ids = bestData.data.map((item) => item.product._id); // Extracting all _id values
            setbestDataId(ids);
        }
    }, [bestData]);

    console.log(bestDataId);

    // ================ get product ==================

    const {
        data,
        isLoading: productLoading,
        isError,
    } = useGetAllProductQuery();
    // console.log(data?.data);

    if (productLoading) {
        return <ProductSkeleton />;
    }

    // ===================== handleEdit function ===============

    const handleEdit = (id) => {
        navigate(`/editProduct/${id}`);
    };

    // ================== handleBestSelling function ================

    const handleBestSelling = async (id) => {
        try {
            const responce = await axios.post(
                `${import.meta.env.VITE_DOMAIN_NAME}bestSelling`,
                {
                    product: id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // console.log(responce?.data?.data);

            if (responce?.data?.data) {
                successToast("product added to best selling");
            } else {
                errorToast("failed to add product");
            }
        } catch (error) {
            console.log("error from product handleBestSelling", error);
        }
    };

    return (
        <div>
            {/* category list */}
            <Card className="h-[575px] mt-10 w-full overflow-y-scroll">
                <table className="w-full  text-center">
                    <thead className="sticky top-0 z-10">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.map(
                            (
                                {
                                    name,
                                    description,
                                    price,
                                    image,
                                    category,
                                    subcategory,
                                    _id,
                                },
                                index
                            ) => {
                                const isLast = index === data?.data.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50 text-center";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal truncate"
                                            >
                                                {description}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {price}$
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                <img
                                                    src={image}
                                                    alt="Missing"
                                                    className="w-[100px]  h-[50px]"
                                                />
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal truncate"
                                            >
                                                {category.length >= 1
                                                    ? category[0].name
                                                    : "none"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal truncate"
                                            >
                                                {subcategory
                                                    ? subcategory[0].name
                                                    : "none"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-x-3 justify-center">
                                                <Button color="red">
                                                    Delete
                                                </Button>

                                                {bestDataId.includes(_id) ? (
                                                    <Button color="red">
                                                        Best Sellling
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        color="blue"
                                                        onClick={() =>
                                                            handleBestSelling(
                                                                _id
                                                            )
                                                        }
                                                    >
                                                        Best Sellling
                                                    </Button>
                                                )}

                                                {/* <Button
                                                    color="blue"
                                                    onClick={() =>
                                                        handleBestSelling(_id)
                                                    }
                                                >
                                                    Best Sellling
                                                </Button> */}
                                                <Button
                                                    color="green"
                                                    onClick={() =>
                                                        handleEdit(_id)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ProductList;
