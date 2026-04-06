import { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import SummaryTiles from "../components/dashboard/SummaryTiles";
import TradeScheduler from "../components/dashboard/TradeScheduler";
import SmallCharts from "../components/dashboard/SmallCharts";
import TradesGrid from "../components/dashboard/TradesGrid";

import "./dashboard.css";

export default function Dashboard() {
  const { data } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filter data to only include trades from the currently selected month and year
  const filteredData = useMemo(() => {
    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();

    return data.filter((trade) => {
      const tradeDate = new Date(trade.date);
      return (
        tradeDate.getMonth() === selectedMonth &&
        tradeDate.getFullYear() === selectedYear
      );
    });
  }, [data, currentDate]);

  return (
    <div className="dashboard">
      <SummaryTiles data={filteredData} />

      <div className="dashboard-middle">
        <TradeScheduler 
          currentDate={currentDate} 
          onCurrentDateChange={setCurrentDate} 
        />
        <SmallCharts data={filteredData} />
      </div>

      <TradesGrid data={filteredData} />
    </div>
  );
}