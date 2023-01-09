import { useState } from "react";
import { Spinner } from "flowbite-react";
import { ReadURL } from "../constants/URLS";
import { ProgressBar } from "../hooks/ProgressBar";

export const ProjectCard = () => {

    //get num from local storage
    const no = JSON.parse(localStorage.getItem("num") || "0");

    const [num, setNum] = useState(no);
    const [max, setMax] = useState(0);
    const [head, setHead] = useState("");
    const [body, setBody] = useState("");
    const [showans, setShowans] = useState(false);

    // save num to local storage
    localStorage.setItem("num", JSON.stringify(num));


    const fetchData = async () => {
        const response = await fetch(ReadURL);
        const values = await response.json();

        const Archives = values.Archives;
        setHead(Archives.head);
        setBody(Archives.body);

        // LENGTH OF DICTIONARY
        setMax(Object.keys(Archives.head).length - 1);
    }
    fetchData();

    const percentage = (num / max) * 100;

    return (
        <div>
            <ProgressBar bg={"bg-emerald-400"} h={"h-1"} wid={percentage.toString()} />
            <div className="container mx-auto">
                <div className="w-3/4 lg:w-10/12 bg-gray-50 dark:bg-gray-800 text-center p-10 shadow-md shadow-gray-200 dark:shadow-gray-600 rounded-xl mx-auto mt-10">
                    {
                        head.length === 0 ?
                            <Spinner />
                            :
                            <div>
                                <h1 className="text-lg lg:text-xl font-mono text-right">
                                    Question {num}
                                </h1>

                                <h1 className="text-3xl lg:text-6xl font-mono font-bold mt-10">
                                    {
                                        head[num] || "Question doesn't exist"
                                    }
                                </h1>

                                <p className="text-xl lg:text-3xl font-serif font-normal mt-6">
                                    {
                                        showans && body[num]
                                    }
                                </p>


                                <div className="flex flex-row justify-around mt-10">
                                    {
                                        !showans &&
                                        <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                                            onClick={() => {
                                                setShowans(!showans);
                                            }}>
                                            Reveal
                                        </button>
                                    }
                                </div>


                                <div className="flex flex-row justify-around mt-10">
                                    {
                                        num === 0 ?
                                            <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-300 bg-gray-100 rounded-lg border border-gray-200  dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 cursor-not-allowed invisible" disabled>
                                                Prev
                                            </button>
                                            :
                                            <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                onClick={() => {
                                                    if (num > 0) {
                                                        setNum(num - 1);
                                                        setShowans(false);
                                                    }
                                                }}>
                                                Prev
                                            </button>
                                    }


                                    {
                                        num === max ?
                                            <button type="button" className="text-gray-400 bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 cursor-not-allowed invisible" disabled>
                                                Next
                                            </button>
                                            :
                                            <button type="button"
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                                                onClick={() => {
                                                    if (num < max) {
                                                        setNum(num + 1);
                                                        setShowans(false);
                                                    }
                                                }}>
                                                Next
                                            </button>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}