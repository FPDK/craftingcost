import {DbItemReagent} from "../types";
import {Table} from "reactstrap";
import React from "react";
import Currency from "./Currency";

type FormatCostProps = { reagents: DbItemReagent[] }

const CostTable = ({reagents}: FormatCostProps) => {

    const totalCost = reagents.reduce((previousValue, currentValue) => previousValue + (currentValue?.expectedCost ?? 0), 0)

    return <div className={"cost-table"}>
        <Table
            className={"responsive-table"}
            size={"sm"}
            striped
            hover
        >
            <thead>
            <tr>
                <th className="item">Item</th>
                <th className="quantity">Quantity</th>
                <th className="availability">Availability</th>
                <th className="price-item">Price/item</th>
                <th className="price-total">Total price</th>
            </tr>
            </thead>
            <tbody>
            {reagents.map((reagent) => {
                return <tr key={reagent.id}>
                    <td className={"item"}>
                        <img src={reagent.img} alt={reagent.name} height={"28"} width={"28"}/>
                        <span>{reagent.name}</span>
                    </td>
                    <td>
                        {reagent.quantity}
                    </td>
                    <td>
                        {reagent.marketQuantity}
                    </td>
                    <td>
                        <Currency amount={reagent.marketValue}/>
                    </td>
                    <td>
                        <Currency amount={reagent.expectedCost}/>
                    </td>
                </tr>
            })}
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={4}>
                    Total cost
                </td>
                <td className="text-end">
                    <Currency amount={totalCost}/>
                </td>
            </tr>
            </tfoot>
        </Table>
    </div>

}

export default CostTable