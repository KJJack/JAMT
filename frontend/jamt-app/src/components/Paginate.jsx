import { useEffect, useState, useContext } from "react";
import { UserContext } from "../util/UserContext";
import axios from "axios";
import AppTable from "./AppTable";
import {getUserApplications} from '../api/api.js'

export default function Paginate() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [sortConfiguration, setSortConfiguration] = useState({ key: null, direction: 'ascending'});
    const [currentPage, setCurrentPage] = useState(1);
    const DATA_PAGE_LIMIT = 10;

    useEffect(() => {

        const fetchApplications = async () => {
            if (user) {
                const userId = user._id || user.id;
                console.log(userId);
                try {
                    const result = await getUserApplications(userId);
                    console.log(user);
                    console.log(result);
                    setData(result);
                } catch(error) {
                    console.error("Paginate fetch error: ", error);
                }
            }
        };

        fetchApplications();

    }, [user]);

    const sortedData = [...data].sort((a, b) => {
        if (sortConfiguration.key === null) {
            return 0;
        }

        let directionMultiplier = sortConfiguration.direction === 'ascending' ? 1 : -1;
        const aVal = a[sortConfiguration.key] ? a[sortConfiguration.key].toString().toLowerCase() : '';
        const bVal = b[sortConfiguration.key] ? b[sortConfiguration.key].toString().toLowerCase() : '';

        if (aVal < bVal) {
            return -1 * directionMultiplier;
        }

        if (aVal > bVal) {
            return 1 * directionMultiplier;
        }

        return 0;
    });

    const handleTableSort = (key) => {
        let direction = 'ascending';
        if (sortConfiguration.key === key && sortConfiguration.direction === 'ascending') {
            direction = 'descending';
        }

        setSortConfiguration({ key, direction });
    }

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * DATA_PAGE_LIMIT;
        const endIndex = startIndex + DATA_PAGE_LIMIT;
        return sortedData.slice(startIndex, endIndex);
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
            <AppTable 
                dataPerPage={getCurrentPageData()}
                handleTableSort={handleTableSort}
                sortConfiguration={sortConfiguration}
            />

            <div className="paginate-btns">
                <button onClick={handlePrevPage}> Prev </button>
                <button onClick={handleNextPage}> Next </button>
            </div>
        </>
    );
}