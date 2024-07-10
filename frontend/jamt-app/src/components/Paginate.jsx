import { useEffect, useState } from "react";
import axios from "axios";
import AppTable from "./AppTable";

export default function Paginate() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState([]);
    const DATA_PAGE_LIMIT = 10;

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                
                const response = await axios.get(
                    'http://localhost:4723/application/6657d89c42f03708296756c2',
                    {headers: {
                        "Authorization": ""
                    }}
                )
                setData(response.data);
                setDataPerPage(response.data.slice(0, DATA_PAGE_LIMIT));
            } catch(error) {
                console.log(error);
            }
        };

        fetchApplications();

    }, [])

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * DATA_PAGE_LIMIT;
        const endIndex = startIndex + DATA_PAGE_LIMIT;
        return data.slice(startIndex, endIndex);
    }

    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / DATA_PAGE_LIMIT)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return(
        <>
            <AppTable dataPerPage={getCurrentPageData()}/>
            <div className="paginate-btns">
                <button onClick={handlePrevPage}> Prev </button>
                <button onClick={handleNextPage}> Next </button>
            </div>
        </>
    );
}