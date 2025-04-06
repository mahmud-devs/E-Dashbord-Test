import React, { useState } from "react";
import {
    Textarea,
    Input,
    Button,
    Card,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option,
} from "@material-tailwind/react";
import {
    useGetallSubCategoryQuery,
    useGetCategoryQuery,
    useUpdateSubCategoryMutation,
    useUploadSubcatgoryMutation,
} from "../../Features/Api/exclusive.api";
import { isCheckValue } from "../../Library/valueChecker";

const Subcategory = () => {
    const [open, setOpen] = React.useState(false);
    const { data, isLoading } = useGetCategoryQuery();
    const [subcategory, setsubcategory] = useState({
        name: "",
        description: "",
        category: "",
    });
    const [UpdateSubcategory, setUpdateSubcategory] = useState({
        name: "",
        description: "",
        category: "",
    });
    const TABLE_HEAD = [" Name", "Description", "Actions"];

    const [tempSubCategoryId, settempSubCategoryId] = useState({});

    const handleOpen = (id) => {
        settempSubCategoryId(id);
        setOpen((prev) => !prev);
        setUpdateSubcategory({
            name: "",
            description: "",
            category: "",
        });
    };

    // ========================== upload sub category ===================

    const [UploadSubcatgory, { isLoading: subloading }] =
        useUploadSubcatgoryMutation();
    const handleSubCategory = async () => {
        try {
            const responce = await UploadSubcatgory(subcategory).unwrap();

            if (responce?.data) {
                console.log("subCategory upload successfull", responce);
            } else {
                console.log("sub category upload failed", responce);
            }
        } catch (error) {
            console.error("error from handlesubcategory", error);
        } finally {
            setsubcategory({
                name: "",
                description: " ",
                category: "",
            });
        }
    };

    // =========================== get all subcategory =================

    const {
        data: subData,
        isLoading: subGetLoading,
        isError: subError,
    } = useGetallSubCategoryQuery();

    // console.log(subData?.data);

    // =========================== update sub category ============

    const [UpdateSubCategory] = useUpdateSubCategoryMutation();

    const updateSubCategory = async () => {
        try {
            const checkValue = isCheckValue(UpdateSubcategory);

            const finalData = new FormData();

            if (checkValue.name) {
                finalData.append("name", checkValue.name);
            }

            if (checkValue.description) {
                finalData.append("description", checkValue.description);
            }

            if (checkValue.category) {
                finalData.append("category", checkValue.category);
            }

            // ========================================

            // console.log(checkValue);

            const responce = await UpdateSubCategory({
                data: checkValue,
                id: tempSubCategoryId._id,
            });

            console.log(responce);
        } catch (error) {
            console.log("error from update sub category", error);
        } finally {
            setUpdateSubcategory({
                name: "",
                description: "",
                category: "",
            });
            setOpen((prev) => !prev);
        }
    };

    // console.log(UpdateSubcategory);

    return (
        <div className="flex flex-col gap-y-5">
            <Input
                size="md"
                label="SubCategory Name"
                color="black"
                name="name"
                value={subcategory.name}
                onChange={(e) =>
                    setsubcategory({
                        ...subcategory,
                        name: e.target.value,
                    })
                }
            />
            <Textarea
                color="gray"
                label="Descrioption"
                name="description"
                value={subcategory.description}
                onChange={(e) =>
                    setsubcategory({
                        ...subcategory,
                        description: e.target.value,
                    })
                }
            />
            {data?.data && (
                <Select
                    label="Select Category"
                    value={subcategory.category}
                    onChange={(e) =>
                        setsubcategory({ ...subcategory, category: e })
                    }
                >
                    {data?.data?.map((category) => (
                        <Option
                            key={category?._id}
                            value={category?._id}
                            className="capitalize"
                        >
                            {category?.name}
                        </Option>
                    ))}
                </Select>
            )}

            <Button
                variant="filled"
                color="green"
                // loading={subloading}
                className="w-[20%]"
                onClick={handleSubCategory}
            >
                Create
            </Button>

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
                        {subData?.data?.map(
                            ({ name, description, _id }, index) => {
                                const isLast =
                                    index === subData?.data?.length - 1;
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
                                                className="font-normal"
                                            >
                                                {description}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-x-3 justify-center">
                                                <Button color="red">
                                                    Delete
                                                </Button>
                                                <Button
                                                    color="green"
                                                    onClick={() =>
                                                        handleOpen({ _id })
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

            {/* dialouge box */}
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogBody className="flex flex-col gap-y-5 p-10">
                    <Input
                        size="md"
                        label="SubCategory Name"
                        color="black"
                        name="name"
                        value={UpdateSubcategory.name}
                        onChange={(e) =>
                            setUpdateSubcategory({
                                ...UpdateSubcategory,
                                name: e.target.value,
                            })
                        }
                    />
                    <Textarea
                        color="gray"
                        label="Descrioption"
                        name="description"
                        value={UpdateSubcategory.description}
                        onChange={(e) =>
                            setUpdateSubcategory({
                                ...UpdateSubcategory,
                                description: e.target.value,
                            })
                        }
                    />
                    {data?.data && (
                        <Select
                            label="Select Category"
                            value={UpdateSubcategory.category}
                            onChange={(e) =>
                                setUpdateSubcategory({
                                    ...UpdateSubcategory,
                                    category: e,
                                })
                            }
                        >
                            {data?.data?.map((category) => (
                                <Option
                                    key={category?._id}
                                    value={category?._id}
                                    className="capitalize"
                                >
                                    {category?.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => updateSubCategory()}
                    >
                        <span>update</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Subcategory;
