import {DbItemReagent} from "../types";
import {Table} from "reactstrap";
import React from "react";
import Currency from "./Currency";

type FormatCostProps = { reagents: DbItemReagent[] }

const FormatCost = ({reagents}: FormatCostProps) => {

    const totalCost = reagents.reduce((previousValue, currentValue) => previousValue + (currentValue?.expectedCost ?? 0), 0)

    return <div>
        <Table size={"sm"} striped>
            <thead>
            <tr>
                <th colSpan={2}>Item</th>
                <th className="text-end">Quantity</th>
                <th className="text-end">Availability</th>
                <th className="text-end">Price/item</th>
                <th className="text-end">Total price</th>
            </tr>
            </thead>
            <tbody>
            {reagents.map((reagent) => {
                return <tr key={reagent.id}>
                    <td>
                        <img src={reagent.img} alt={reagent.name} height={28} width={"auto"}/>
                    </td>
                    <td>
                        {reagent.name}
                    </td>
                    <td className="text-end">
                        {reagent.quantity}
                    </td>
                    <td className="text-end">
                        {reagent.marketQuantity}
                    </td>
                    <td className="text-end">
                        <Currency amount={reagent.marketValue}/>
                    </td>
                    <td className="text-end">
                        <Currency amount={reagent.expectedCost}/>
                    </td>
                </tr>
            })}
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={5}>
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

export default FormatCost