import React, {useCallback, useState} from "react";
import {DbItem, Professions} from "../types";
import itemDatabase from "../db/db";
import {Col, Input, Row, Table} from "reactstrap";
import ProfessionDropdown from "./ProfessionDropdown";

type ProfessionTableProps = { requestItemCallback: Function, activeRecipeName?: string | number | undefined }

const ProfessionTable = ({requestItemCallback, activeRecipeName = undefined}: ProfessionTableProps) => {

    const [filterValue, setFilterValue] = useState<string>("");
    const [selectedProfession, setSelectedProfession] = useState<Professions | undefined>(Professions.ENCHANTING);
    const [filteredProfessions, setFilteredProfessions] = useState<DbItem[]>(itemDatabase[Professions.ENCHANTING]);


    const setActiveProfession = useCallback((profession: Professions) => () => {
        setSelectedProfession(profession)
        setFilteredProfessions(itemDatabase[profession])
        setFilterValue("")
    }, [])


    const searchRecipeCallback = useCallback((event) => {

        const value = event.target.value

        setFilterValue(value)

        if (selectedProfession) {
            setFilteredProfessions(itemDatabase[selectedProfession]
                .filter(recipe => recipe.name.toLowerCase().includes(value.toLowerCase())
                ))
        }

    }, [selectedProfession])


    return <Row>

        <Col xs={12} sm={4} md={5}>
            <ProfessionDropdown
                selectedProfession={selectedProfession}
                setActiveProfession={setActiveProfession}
            />
            [slot-dropdown]
        </Col>

        <Col xs={12} sm={8} md={7}>
            <Input
                type={"text"}
                value={filterValue}
                placeholder={"Search in active profession.."}
                onChange={searchRecipeCallback}
            />
        </Col>

        <Col xs={12} className={"mt-3"}>
            <Table size={"sm"} striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Slot</th>
                </tr>
                </thead>
                <tbody>
                {filteredProfessions.map((item) => {
                    return <tr key={item.name}
                               onClick={requestItemCallback(item.name, item.reagents)}
                               className={"warning"}
                    >
                        <td className={`cursor-pointer ${activeRecipeName === item.name ? "fw-bold" : ""}`}>{item.name}</td>
                        <td>{item.type}</td>
                    </tr>
                })}
                </tbody>
            </Table>
        </Col>

    </Row>

}

export default ProfessionTable;