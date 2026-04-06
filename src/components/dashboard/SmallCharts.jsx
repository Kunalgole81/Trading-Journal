import Chart, {
    Series,
    Tooltip
} from "devextreme-react/chart";
import PieChart, {
    Series as PieSeries,
    Label,
    Connector
} from "devextreme-react/pie-chart";

// Accept 'data' via props
export default function SmallCharts({ data }) {
    
    // Fallback to empty array to prevent map/filter crashes if data is initially undefined
    const safeData = data || []; 

    const winLossData = [
        { type: "Win", value: safeData.filter(d => d.winLoss === "Win").length, color: "rgb(29, 178, 245)" },
        { type: "Loss", value: safeData.filter(d => d.winLoss === "Loss").length, color: "#6c6565" }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, backgroundColor: "white" }}>
            <PieChart
                dataSource={winLossData}
                height={240}
                customizePoint={(point) => ({
                    color: point.data.color
                })}
            >
                <PieSeries
                    argumentField="type"
                    valueField="value"
                >
                    <Label visible format="fixedPoint" />
                    <Connector visible />
                </PieSeries>
                <Tooltip enabled />
            </PieChart>
            <Chart dataSource={safeData} height={240}>
                <Series
                    argumentField="srNo"
                    valueField="profitLoss"
                    type="line"
                    point={{ visible: false }}
                />
                <Tooltip enabled />
            </Chart>
        </div>
    );
}