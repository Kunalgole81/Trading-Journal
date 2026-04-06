import Scheduler from "devextreme-react/scheduler";
import { useData } from "../../context/DataContext";
import { useMemo } from "react";
import "./TradeScheduler.css";

export default function TradeScheduler({ currentDate, onCurrentDateChange }) {
    const { data } = useData();

    const grouped = useMemo(() => {
        return data.reduce((acc, trade) => {
            const date = trade.date;

            if (!acc[date]) {
                acc[date] = {
                    date,
                    totalPL: 0,
                    count: 0,
                };
            }

            acc[date].totalPL += trade.profitLoss;
            acc[date].count += 1;

            return acc;
        }, {});
    }, [data]);

    const schedulerData = useMemo(() => {
        return Object.values(grouped).map((day) => {
            const formattedDate = new Date(day.date);

            return {
                text: day.date,
                startDate: formattedDate,
                endDate: formattedDate,
                totalPL: day.totalPL,
                count: day.count,
            };
        });
    }, [grouped]);

    function AppointmentRender({ appointmentData }) {
        const isProfit = appointmentData.totalPL >= 0;

        return (
            <div
                style={{
                    padding: "1px 8px",
                    borderRadius: "6px",
                    backgroundColor: isProfit
                        ? "rgba(22,163,74,0.1)"
                        : "rgba(220,38,38,0.1)",
                    border: `1px solid ${isProfit ? "#16a34a" : "#dc2626"}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                }}
            >
                <div style={{ fontSize: "11px", fontWeight: 500, color: "#555" }}>
                    {appointmentData.count} Trades
                </div>

                <div
                    style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: isProfit ? "#0b8136" : "#dc2626",
                    }}
                >
                    {appointmentData.totalPL.toFixed(2)}
                </div>
            </div>
        );
    }

    const onAppointmentFormOpening = (e) => {
        const { appointmentData, form } = e;

        const date = new Date(appointmentData.startDate);
        const formattedDate = date.toISOString().split("T")[0];

        form.option("formData", {
            text: formattedDate,
            description: `${appointmentData.count} Trades\nProfit/Loss: ${appointmentData.totalPL.toFixed(
                2
            )}`,
        });

        form.option({
            colCount: 1,
            items: [
                {
                    dataField: "text",
                    label: { text: "Subject" },
                    editorOptions: { readOnly: true },
                },
                {
                    dataField: "description",
                    editorType: "dxTextArea",
                    label: { text: "Description" },
                    editorOptions: { readOnly: true, height: 90 },
                },
            ],
        });
    };

    // Listen for navigation changes (Next/Prev month)
    const handleOptionChanged = (e) => {
        if (e.name === "currentDate") {
            onCurrentDateChange(e.value);
        }
    };

    return (
        <Scheduler
            dataSource={schedulerData}
            views={["month"]}
            defaultCurrentView="month"
            currentDate={currentDate}
            onOptionChanged={handleOptionChanged}
            height={500}
            startDayHour={0}
            endDayHour={24}
            editing={{
                allowDeleting: false,
                allowAdding: false,
                allowUpdating: false,
                allowTimeZoneEditing: false,
            }}
            appointmentRender={AppointmentRender}
            onAppointmentFormOpening={onAppointmentFormOpening}
        />
    );
}