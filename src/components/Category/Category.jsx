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
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
    useGetCategoryQuery,
    useUploadCategoryMutation,
} from "../../Features/Api/exclusive.api";
const Category = () => {
    const [tempCategoryData, settempCategoryData] = useState({});
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [UploadCategory] = useUploadCategoryMutation();
    const { data, isLoading, isError } = useGetCategoryQuery();

    const [open, setOpen] = React.useState(false);
    const TABLE_HEAD = ["Name", "Description", "Product", "Actions"];

    const handleOpen = (item) => {
        settempCategoryData(item);
        setOpen((prev) => !prev);
    };

    console.log(tempCategoryData);
    // ===================== handle category upload function ========================
    const handleCategory = async (data) => {
        try {
            const response = await UploadCategory({
                name: data.name,
                description: data.Descrioption,
            });
            console.log(response?.data);

            // if (response?.data?.data) {
            //     successToast("Category Upload Successfully");
            // }
        } catch (error) {
            console.log("Error from upload category:", error);
        } finally {
            reset();
        }
    };
    return (
        <div className="flex flex-col gap-y-5">
            <form
                id="mainForm"
                className="flex flex-col gap-y-5"
                onSubmit={handleSubmit(handleCategory)}
            >
                <Input
                    size="md"
                    label="Name"
                    color="black"
                    {...register("name", { required: true, maxLength: 20 })}
                />

                {errors.name && (
                    <span className="text-red-500">
                        The title can olny be 20 character.
                    </span>
                )}
                <Textarea
                    color="gray"
                    label="Descrioption"
                    {...register("Descrioption", { required: true })}
                />
                {errors.Descrioption && (
                    <span className="text-red-500">
                        Please fill the Descrioption .
                    </span>
                )}
                <Button
                    variant="filled"
                    type="submit"
                    color="green"
                    loading={false}
                    form="mainForm"
                    className="w-[20%]"
                >
                    Upload
                </Button>
            </form>
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
                        {data?.data
                            ?.slice()
                            ?.reverse()
                            ?.map(
                                (
                                    {
                                        name,
                                        product,
                                        description,
                                        isActive,
                                        _id,
                                    },
                                    index
                                ) => {
                                    const isLast =
                                        index === data?.data.length - 1;
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
                                                    className="font-normal w-[95%] truncate"
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
                                                    {product?.length}
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
                                                            handleOpen({
                                                                name,
                                                                description,
                                                                _id,
                                                            })
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
                    <form className="flex flex-col gap-y-5 p-10">
                        <Input
                            size="md"
                            label=" Name"
                            color="black"
                            defaultValue={tempCategoryData?.name}
                        />
                        <Textarea
                            color="gray"
                            label="Descrioption"
                            defaultValue={tempCategoryData?.description}
                        />
                    </form>
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
                        onClick={handleOpen}
                    >
                        <span>update</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Category;
