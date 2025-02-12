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
import React from "react";
const TABLE_HEAD = ["Title", "Banner", "Date", "Actions"];
const Banner = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    const TABLE_ROWS = [
        {
            name: "John Michael",
            job: "Manager",
            date: "23/04/18",
        },
        {
            name: "Alexa Liras",
            job: "Developer",
            date: "23/04/18",
        },
        {
            name: "Laurent Perrier",
            job: "Executive",
            date: "19/09/17",
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08",
        },
    ];
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    return (
        <div className="flex flex-col gap-y-5">
            <form
                className="flex flex-col gap-y-5"
                onSubmit={handleSubmit(onsubmit)}
            >
                <Input
                    size="md"
                    label="Banner Title"
                    color="black"
                    defaultValue=""
                    {...register("title", { required: true })}
                />
                {errors.title && <span>This field is required</span>}

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
                        <input id="dropzone-file" type="file" class="hidden" />
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
                        {TABLE_ROWS.map(({ name, job, date }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
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
                                            {job}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-x-3 justify-center">
                                            <Button color="red">Delete</Button>
                                            <Button
                                                color="green"
                                                onClick={handleOpen}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
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
                    <Input size="md" label="Banner Title" color="black" />
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
                            />
                        </label>
                    </div>
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
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Banner;
