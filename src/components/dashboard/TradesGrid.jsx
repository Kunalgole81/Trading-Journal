import DataGrid, {
  Column,
  HeaderFilter,
  FilterRow
} from "devextreme-react/data-grid";

// Accept 'data' via props
export default function TradesGrid({ data = [] }) {

  return (
    <DataGrid
      dataSource={data}
      keyExpr="srNo"
      showBorders
      height={325}
    >
      <FilterRow visible />
      <HeaderFilter visible />

      <Column dataField="date" />
      <Column dataField="currency" />
      <Column dataField="quantity" />
      <Column dataField="timeFrame" />
      <Column dataField="typeOfTrade" />
      <Column dataField="longShort" />
      <Column dataField="winLoss" />
      <Column dataField="profitLoss" />
      <Column dataField="balance" />
    </DataGrid>
  );
}