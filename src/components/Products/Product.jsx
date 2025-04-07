import { Input, Select, Option, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
    useGetCategoryQuery,
    useGetSingleCategoryQuery,
    useGetallSubCategoryQuery,
} from "../../Features/Api/exclusive.api";

import { axiosinstance } from "../../Features/Api/AxiosInstance";
import axios from "axios";
const Product = () => {
    const [value, setValue] = useState("");

    const [quilvalue, setQuiValue] = useState("");
    const [loading, setloading] = useState(false);
    const [categoryid, setcategoryId] = useState(null);
    const { data: categoryData, isLoading: categoryLoading } =
        useGetCategoryQuery();

    const { data: singlecategoryData, isLoading: singlecategoryLoading } =
        useGetSingleCategoryQuery(categoryid, {
            skip: !categoryid,
        });

    const [productdata, setproductdata] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        subcategory: "",
        discount: 0,
        rating: 0,
        review: "",
        stock: 0,
        image: "",
    });

    // ================== all input onchange function
    const handlechange = (e) => {
        const { name, value } = e.target;
        if (
            name == "price" ||
            name === "discount" ||
            name == "rating" ||
            name == "stock"
        ) {
            setproductdata({ ...productdata, [name]: parseInt(value) });
        } else {
            setproductdata({ ...productdata, [name]: value });
        }
    };

    const handleCategory = (value) => {
        setcategoryId(value);
        setproductdata({ ...productdata, category: value });
    };

    const handleSubCategory = (value) => {
        setproductdata({ ...productdata, subcategory: value });
    };

    //================== handle quil function
    const handleQuillChange = (value) => {
        setQuiValue(value);
        setproductdata((prev) => ({
            ...prev,
            description: value,
        }));
    };

    //=================== handleImage function

    const handleImageChange = (event) => {
        setproductdata((prev) => ({
            ...prev,
            image: event.target.files[0],
        }));
    };

    //======================= handle Upload funtion
    const handleUpload = async () => {
        try {
            setloading(true);
            const response = await axios.post(
                "http://localhost:4000/api/v1/product",
                productdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response);

            // if (response.data.data) {
            //     successToast("product upload succesfull");
            // }
        } catch (error) {
            console.error("error", error);
        } finally {
            setloading(false);
            setcategoryId("");
            setQuiValue("");
            setproductdata({
                name: "",
                description: "",
                price: 0,
                category: "",
                subcategory: "",
                discount: 0,
                rating: 0,
                review: "",
                stock: 0,
                image: "",
            });
        }
    };

    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        if (singlecategoryData?.data?.subCategory) {
            setSubCategories(singlecategoryData.data.subCategory);
        }
    }, [singlecategoryData]);

    return (
        <>
            <div className="flex flex-col gap-y-10">
                <Input
                    size="md"
                    label="Product Name"
                    name="name"
                    value={productdata.name}
                    onChange={handlechange}
                />
                <div className="mb-10">
                    <label htmlFor="description" className="mb-3 inline-block">
                        Description
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={quilvalue}
                        onChange={handleQuillChange}
                        className="h-[300px]"
                    />
                </div>

                <Input
                    size="md"
                    label="Product price"
                    type="number"
                    name="price"
                    value={productdata.price}
                    onChange={handlechange}
                />

                <div className="flex items-start justify-between">
                    <div className="w-[30%] bg-red-50">
                        <div class="flex items-center justify-center w-full">
                            <label
                                for="dropzone-file"
                                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input
                                    multiple
                                    accept="image/png, image/jpeg"
                                    id="dropzone-file"
                                    type="file"
                                    class="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="w-[65%] flex flex-col gap-y-24 ">
                        <div className=" flex justify-between">
                            <div className="w-[45%] flex flex-col gap-y-10">
                                {!categoryLoading && (
                                    <Select
                                        color="purple"
                                        label="Select Category"
                                        name="category"
                                        value={productdata.category}
                                        onChange={handleCategory}
                                    >
                                        {categoryData.data?.map((item) => (
                                            <Option
                                                value={item._id}
                                                key={item._id}
                                            >
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}

                                <Input
                                    onChange={handlechange}
                                    size="md"
                                    label="Product Discount"
                                    type="number"
                                    name="discount"
                                    value={productdata.discount}
                                />
                            </div>

                            <div className="w-[45%] flex flex-col gap-y-10">
                                {categoryid == null ? (
                                    <Select
                                        disabled
                                        color="purple"
                                        label="Select sub Category"
                                        name="subcategory"
                                    >
                                        <Option value="">
                                            No Category Selected
                                        </Option>
                                    </Select>
                                ) : (
                                    <Select
                                        onChange={handleSubCategory}
                                        color="purple"
                                        label="Select sub Category"
                                        name="subcategory"
                                        value={productdata.subcategory}
                                    >
                                        {subCategories.length > 0 ? (
                                            subCategories.map((item) => (
                                                <Option
                                                    value={item._id}
                                                    key={item._id}
                                                >
                                                    {item.name}
                                                </Option>
                                            ))
                                        ) : (
                                            <Option value="">
                                                No Subcategories Available
                                            </Option>
                                        )}
                                    </Select>
                                )}

                                <Input
                                    onChange={handlechange}
                                    size="md"
                                    label="Product Stock"
                                    type="number"
                                    name="stock"
                                    value={productdata.stock}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <Input
                                onChange={handlechange}
                                size="md"
                                label="Product Rating"
                                type="number"
                                max={5}
                                name="rating"
                                value={productdata.rating}
                            />
                            <Input
                                onChange={handlechange}
                                size="md"
                                label="Product reviews"
                                type="text"
                                name="review"
                                value={productdata.review}
                            />
                        </div>
                    </div>
                </div>

                <Button
                    variant="filled"
                    color="green"
                    loading={loading}
                    className="w-[15%]"
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </div>
        </>
    );
};

export default Product;
