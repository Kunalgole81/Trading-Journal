import { createContext, useContext, useEffect, useState } from "react";
import { tradesData } from "../pages/data";

const DataContext = createContext();

const STORAGE_KEY = "app-grid-data";

export function DataProvider({ children }) {
    const [data, setData] = useState(tradesData);
    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData?.length > 0) {
            setData(JSON.parse(storedData));
        }
        else {
            setData(tradesData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const addItem = (item) => {
        setData(prev => [...prev, item]);
    };

    const updateItem = (key, updatedItem) => {
        setData(prev =>
            prev.map(item =>
                item.srNo === key ? { ...item, ...updatedItem } : item
            )
        );
    };

    const deleteItems = (keys) => {
        setData(prev =>
            prev.filter(item => !keys.includes(item.srNo))
        );
    };

    return (
        <DataContext.Provider
            value={{
                data,
                addItem,
                updateItem,
                deleteItems
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
