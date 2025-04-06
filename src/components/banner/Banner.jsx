import {
    Button,
    Input,
    Card,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
const TABLE_HEAD = ["Title", "Banner", "Date", "Actions"];
import {
    useDeleteBannerMutation,
    useGetBannerQuery,
    useUpdateBannerMutation,
    useUploadBannerMutation,
} from "../../Features/Api/exclusive.api";
import moment from "moment-timezone";
import { isCheckValue } from "../../Library/valueChecker";
const Banner = () => {
    const [open, setOpen] = React.useState(false);
    const [tempBannerData, setTempBannerData] = useState({});
    const [updatedData, setUpdatedData] = useState({
        _id: "",
        name: "",
        image: "",
    });

    const handleOpen = (item) => {
        if (item) {
            setTempBannerData(item);
            setUpdatedData({
                ...updatedData,
                _id: item._id,
            });
        }

        setOpen((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // ======================= upload banner ============================

    const [UploadBanner] = useUploadBannerMutation();

    const hamdleBannerSubmut = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data?.image[0]);
            formData.append("name", data?.name);

            const responce = await UploadBanner(formData);
            console.log(responce);
        } catch (error) {
            console.log("error from handlebanner submit", error);
        } finally {
            reset();
        }
    };

    // ========================== get banner data ====================

    const { data } = useGetBannerQuery();
    // console.log(data?.data);

    // ============================== update banner ====================

    const handleImage = (e) => {
        console.log(e.target.files[0]);
    };

    // console.log("llllllllo", updatedData);

    const [UpdateBanner, { isLoading: updateLoading }] =
        useUpdateBannerMutation();

    const handlUpdateBanner = async () => {
        try {
            const checkedData = isCheckValue(updatedData);
            if (checkedData == false) {
                console.log("updateded data is blank or failed to get data");
                return;
            }
            const actualUpdateData = new FormData();
            // for (let key in checkedData) {
            //     if (key == "_id") {
            //         continue;
            //     } else {
            //         actualUpdateData[key] = checkedData[key];
            //     }
            // }

            if (checkedData.image) {
                actualUpdateData.append("image", checkedData.image);
            }
            if (checkedData.name) {
                actualUpdateData.append("name", checkedData.name);
            }
            // console.log("actualUpdateData", actualUpdateData);

            const response = await UpdateBanner({
                data: actualUpdateData,
                id: checkedData._id,
            });

            console.log(response);
        } catch (error) {
            console.log("error from handleUpdate banner", error);
        } finally {
            reset();
            setUpdatedData({
                _id: "",
                name: "",
                image: "",
            });
            setOpen(false);
        }

        // console.log("ohhh", e.target);
    };

    // ======================= delete banner ===================

    const [DeleteBanner] = useDeleteBannerMutation();

    const handleDeleteBanner = async (id) => {
        try {
            const responce = await DeleteBanner(id);

            if (responce?.data?.data) {
                console.log("banner deleted successfully", responce);
            }
            console.log(responce);
        } catch (error) {
            console.log("error from handleDeleteBanner", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-5">
            <form
                className="flex flex-col gap-y-5"
                onSubmit={handleSubmit(hamdleBannerSubmut)}
            >
                <Input
                    size="md"
                    label="Banner Title"
                    color="black"
                    defaultValue=""
                    {...register("name", { required: true })}
                />
                {errors.name && (
                    <span className="text-red-500">This field is required</span>
                )}

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
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            {...register("image", { required: true })}
                        />
                        {errors.image && (
                            <span className="text-red-500">
                                Image is required
                            </span>
                        )}
                    </label>
                </div>

                <Button
                    variant="outlined"
                    type="submit"
                    loading={false}
                    className="w-[10%]"
                >
                    Upload
                </Button>
            </form>

            {/* banner list */}

            <Card className="h-[460px] w-full overflow-y-scroll">
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
                            ({ image, name, _id, updatedAt }, index) => {
                                const isLast = index === data?.data.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50 text-center";
                                return (
                                    <tr key={_id}>
                                        <td>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="h-[100px] flex justify-center">
                                                <div className="h-[100px w-[150px]">
                                                    <img
                                                        src={image}
                                                        className="w-full bg-cover h-full"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {moment(updatedAt)
                                                    .tz("Asia/Dhaka")
                                                    .format(
                                                        "D/M/YYYY hh:mm A "
                                                    )}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-x-3 justify-center">
                                                <Button
                                                    onClick={() =>
                                                        handleDeleteBanner(_id)
                                                    }
                                                    color="red"
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    color="green"
                                                    onClick={() =>
                                                        handleOpen({
                                                            image,
                                                            name,
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

            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogBody className="flex flex-col gap-y-5">
                    <form
                        id="dialogForm"
                        className="flex flex-col gap-y-5"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <Input
                            size="md"
                            label="Banner Title"
                            color="black"
                            defaultValue={tempBannerData.name}
                            onClick={(e) => (e.target.value = "")}
                            onChange={(e) =>
                                setUpdatedData({
                                    ...updatedData,
                                    name: e.target.value,
                                })
                            }
                        />

                        {/* ====================== upload image===================
                         */}
                        <div className="w-full h-[250px] relative group ">
                            <img
                                src={tempBannerData.image}
                                alt="banner"
                                className="w-full h-full object-cover"
                            />

                            {/* ================================================================ */}

                            <div class="flex items-center justify-center w-full h-full absolute left-0 top-0  transition-opacity duration-300 opacity-0 group-hover:opacity-80">
                                <label
                                    htmlFor="dialog-dropzone-file"
                                    className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <svg
                                            className="w-8 h-8 mb-4 text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
                         5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-white">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-white">
                                            SVG, PNG, JPG or GIF (MAX.
                                            800x400px)
                                        </p>
                                    </div>
                                    <input
                                        id="dialog-dropzone-file"
                                        type="file"
                                        name="image"
                                        className="hidden"
                                        onChange={(e) =>
                                            setUpdatedData({
                                                ...updatedData,
                                                image: e.target.files[0],
                                            })
                                        }

                                        // onChange={handleImage}
                                    />
                                </label>
                            </div>
                        </div>
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
                                onClick={handlUpdateBanner}
                            >
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
        </div>
    );
};

export default Banner;
