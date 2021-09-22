import React from "react";
import {Table} from "reactstrap";
import {DbItem} from "../types";

type ProfessionTableProps = {
    filteredProfessions: DbItem[]
    requestItemCallback: Function,
    activeRecipeName?: string | number | undefined
}

const ProfessionTable = (
    {
        filteredProfessions,
        requestItemCallback,
        activeRecipeName = undefined
    }: ProfessionTableProps
) => {

    return <div className={"profession-table"}>
        <Table
            className={"responsive-table"}
            size={"sm"}
            striped
            hover
        >
            <thead>
            <tr>
                <th className={"name"}>Name</th>
                <th className={"slot"}>Slot</th>
            </tr>
            </thead>
            <tbody>
            {filteredProfessions.map((item) => {
                return <tr key={item.name}
                           onClick={requestItemCallback(item.name, item.reagents)}
                           className={"cursor-pointer "}
                >
                    <td className={`${activeRecipeName === item.name ? "fw-bold" : ""}`}>{item.name}</td>
                    <td>{item.type}</td>
                </tr>
            })}
            </tbody>
        </Table>
    </div>

}

export default ProfessionTable;