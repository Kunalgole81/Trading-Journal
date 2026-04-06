import React from 'react'
import Button from "devextreme-react/button";
import DateBox from "devextreme-react/date-box";
import SelectBox from "devextreme-react/select-box";
import NumberBox from "devextreme-react/number-box";
import Form, {
    Item as FormItem,
    RequiredRule
} from "devextreme-react/form";
import Popup from "devextreme-react/popup";

const AddEditPopup = (props) => {
    const { popupVisible, setPopupVisible, isEditMode, formData, handleSave, setFormData } = props;
    return (
        <Popup
            visible={popupVisible}
            onHiding={() => setPopupVisible(false)}
            title={isEditMode ? "Edit Trade" : "Add Trade"}
            width={700}
            height="auto"
            showCloseButton
        >
            <Form
                formData={formData}
                colCount={2}
                labelLocation="top"
                onFieldDataChanged={(e) =>
                    setFormData({
                        ...formData,
                        [e.dataField]: e.value
                    })
                }
            >
                {/* Date */}
                <FormItem
                    dataField="date"
                    editorType="dxDateBox"
                    editorOptions={{
                        displayFormat: "dd-MM-yyyy",
                        width: "100%"
                    }}
                >
                    <RequiredRule message="Date is required" />
                </FormItem>

                {/* Currency */}
                <FormItem
                    dataField="currency"
                    editorType="dxSelectBox"
                    editorOptions={{
                        items: ["BTCUSDT", "ETHUSDT", "SOLUSDT"],
                        searchEnabled: true
                    }}
                >
                    <RequiredRule />
                </FormItem>

                {/* Quantity */}
                <FormItem
                    dataField="quantity"
                    editorType="dxNumberBox"
                    editorOptions={{
                        showSpinButtons: true,
                        min: 0
                    }}
                >
                    <RequiredRule />
                </FormItem>

                {/* Time Frame */}
                <FormItem
                    dataField="timeFrame"
                    editorType="dxSelectBox"
                    editorOptions={{
                        items: ["1m", "5m", "15m", "1H", "4H", "1D"]
                    }}
                />

                {/* Type of Trade */}
                <FormItem
                    dataField="typeOfTrade"
                    editorType="dxSelectBox"
                    editorOptions={{
                        items: ["Scalping", "Intraday", "Swing", "Position"]
                    }}
                />

                {/* Trading Strategy */}
                <FormItem
                    dataField="tradingStrategy"
                    editorType="dxSelectBox"
                    editorOptions={{
                        items: ["Order block", "15&9 EMA", "Breakout", "Pullback", "Trend Following", "Reversal"]
                    }}
                />

                {/* Long / Short */}
                <FormItem
                    dataField="longShort"
                    editorType="dxSelectBox"
                    editorOptions={{
                        items: ["Long", "Short"]
                    }}
                />

                {/* Win / Loss */}
                <FormItem
                    dataField="winLoss"
                    editorType="dxSelectBox"
                    editorOptions={{
                        items: ["Win", "Loss"]
                    }}
                />

                {/* Profit / Loss */}
                <FormItem
                    dataField="profitLoss"
                    editorType="dxNumberBox"
                    editorOptions={{
                        showSpinButtons: true,
                        format: "#,##0.00"
                    }}
                />

                {/* Balance */}
                <FormItem
                    dataField="balance"
                    editorType="dxNumberBox"
                    editorOptions={{
                        showSpinButtons: true,
                        format: "#,##0.00"
                    }}
                />
            </Form>

            {/* Footer Buttons */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    marginTop: 25
                }}
            >
                <Button
                    text="Cancel"
                    stylingMode="outlined"
                    onClick={() => setPopupVisible(false)}
                />

                <Button
                    text="Save"
                    type="default"
                    stylingMode="contained"
                    onClick={handleSave}
                />
            </div>
        </Popup>
    )
}

export default AddEditPopup