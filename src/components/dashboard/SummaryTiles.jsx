import "./summaryTiles.css";

// Accept 'data' via props
export default function SummaryTiles({ data = [] }) {
  const totalTrades = data.length;
  const wins = data.filter(t => t.winLoss === "Win").length;

  const totalPL = data.reduce((sum, t) => sum + t.profitLoss, 0);
  const lastBalance = data[data.length - 1]?.balance ?? 0;

  const winRate = totalTrades
    ? ((wins / totalTrades) * 100).toFixed(2)
    : 0;

  const tiles = [
    {
      title: "Total Trades",
      value: totalTrades,
      icon: "chart"
    },
    {
      title: "Win Rate",
      value: `${winRate}%`,
      icon: "percent"
    },
    {
      title: "Total P/L",
      value: totalPL.toFixed(2),
      icon: "money",
      valueColor: totalPL >= 0 ? "profit" : "loss"
    },
    {
      title: "Balance",
      value: lastBalance.toFixed(2),
      icon: "card"
    }
  ];

  return (
    <div className="tiles">
      {tiles.map(t => (
        <div key={t.title} className="tile">
          <div className="tile-header">
            <i className={`dx-icon dx-icon-${t.icon}`} />
            <span className="tile-title">{t.title}</span>
          </div>

          <div className={`tile-value ${t.valueColor || ""}`}>
            {t.value}
          </div>
        </div>
      ))}
    </div>
  );
}