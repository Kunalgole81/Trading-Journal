import {
  HeaderFilter,
  FilterRow,
  ColumnChooser,
  Toolbar,
  Item,
  Selection,
} from "devextreme-react/data-grid";
import DataGrid, { Column } from "devextreme-react/data-grid";

import Form, { SimpleItem } from "devextreme-react/form";

import { useRef, useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import SummaryTiles from "../components/dashboard/SummaryTiles";
import { columnConfig } from "./data";
import { Button } from "devextreme-react";
import AddEditPopup from "../components/AddEditPopup";
import Popup from "devextreme-react/popup";
import "./gridPage.css";


export default function GridPage() {
  const gridRef = useRef(null);
  const { data, addItem, updateItem, deleteItem } = useData();
  const [gridData, setGridData] = useState(data);

  const [selectedRow, setSelectedRow] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(gridData);

  const clearFilters = () => {
    const grid = gridRef.current?.instance;
    grid.clearFilter();
    grid.clearSorting();
  };

  const handleSelectionChange = (e) => {
    setSelectedRow(e.selectedRowsData[0] || null);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setFormData({});
    setPopupVisible(true);
  };

  const handleEdit = () => {
    if (!selectedRow) return;
    setIsEditMode(true);
    setFormData({ ...selectedRow });
    setPopupVisible(true);
  };

  const handleSave = () => {
    if (isEditMode) {
      setGridData(prev =>
        prev.map(item =>
          item.srNo === formData.srNo ? formData : item
        )
      );
    } else {
      setGridData(prev => [
        ...prev,
        { ...formData, srNo: Date.now() }
      ]);
    }

    setPopupVisible(false);
    setSelectedRow(null);
  };
  const handleSoftDelete = () => {
    if (!selectedRow) return;

    setGridData(prev =>
      prev.map(item =>
        item.srNo === selectedRow.srNo
          ? { ...item, isDeleted: true }
          : item
      )
    );

    setDeleteConfirmVisible(false);
    setSelectedRow(null);
  };
  useEffect(() => {
    setGridData(data);
  }, [data]);
  return (
    <>
      <SummaryTiles data={filteredData} />
      <DataGrid
        dataSource={gridData}
        ref={gridRef}
        keyExpr="srNo"
        showBorders
        onSelectionChanged={handleSelectionChange}
        className="gridpage"
        style={{ "paddingTop": "10px" }}
        onRowPrepared={(e) => {
          if (e.data?.isDeleted) {
            e.rowElement.style.opacity = 0.4;
            e.rowElement.style.pointerEvents = "none";
          }
        }}
        onContentReady={(e) => {
          const visibleRows = e.component.getVisibleRows();
          const filtered = visibleRows.map(row => row.data);
          setFilteredData(filtered);
        }}
      >
        <HeaderFilter visible />
        <FilterRow visible />

        <Selection mode="single" showCheckBoxesMode="always" />

        <ColumnChooser enabled mode="select" search={{ enabled: true }} position={{ my: "right top", at: "right bottom", of: "#columnChooserBtn" }} />

        <Toolbar>
          <Item
            location="before"
            widget="dxButton"
            options={{
              icon: "clear",
              stylingMode: "outlined",
              hint: "Clear Filter",
              onClick: clearFilters
            }}
          />

          <Item
            location="after"
            widget="dxButton"
            options={{
              icon: "add",
              hint: "Add",
              onClick: handleAdd
            }}
          />

          <Item
            location="after"
            widget="dxButton"
            options={{
              icon: "edit",
              hint: "Edit",
              disabled: !selectedRow,
              onClick: handleEdit
            }}
          />
          <Item location="after" widget="dxButton" options={{
            icon: "trash",
            hint: "Delete",
            disabled: !selectedRow,
            onClick: () => setDeleteConfirmVisible(true)
          }} />
          <Item location="after" widget="dxButton" options={{ icon: "upload", text: "" }} />
          <Item location="after" widget="dxButton" options={{ icon: "download", text: "" }} />
          <Item location="after" widget="dxButton" options={{
            icon: "save",
            text: "",
            hint: "Save",
            elementAttr: { id: "columnChooserBtn" },
            onClick: () => {
              gridData.forEach(item => {
                if (item.isDeleted) {
                  deleteItem(item.srNo);
                } else {
                  const exists = data.find(d => d.srNo === item.srNo);
                  exists ? updateItem(item) : addItem(item);
                }
              });
            }
          }} />
          <Item
            location="after"
            widget="dxButton"
            options={{
              icon: "columnchooser",
              onClick: () =>
                gridRef.current?.instance.showColumnChooser()
            }}
          />
        </Toolbar>

        {columnConfig
          .filter((col) => col.visible !== false)
          .map((col) => (
            <Column key={col.dataField} {...col} />
          ))}
      </DataGrid>
      <Popup
        visible={deleteConfirmVisible}
        onHiding={() => setDeleteConfirmVisible(false)}
        width={300}
        height={200}
        showTitle
        title="Confirm Delete"
      >
        <div >
          <p>Are you sure you want to delete this record?</p>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Button
              text="Cancel"
              onClick={() => setDeleteConfirmVisible(false)}
            />
            <Button
              text="Yes"
              type="danger"
              onClick={handleSoftDelete}
            />
          </div>
        </div>
      </Popup>
      <AddEditPopup formData={formData} isEditMode={isEditMode} popupVisible={popupVisible} setPopupVisible={setPopupVisible} handleSave={handleSave} setFormData={setFormData} />
    </>
  );
}