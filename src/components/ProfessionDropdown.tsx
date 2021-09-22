import {Professions} from "../types";
import React, {useCallback, useRef, useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

type ProfessionDropdownProps = {
    selectedProfession: Professions | undefined
    setActiveProfession: (profession: Professions) => () => void
}

const ProfessionDropdown = ({selectedProfession, setActiveProfession}: ProfessionDropdownProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => setIsOpen(prevState => !prevState), [])

    const professions = useRef([Professions.ALCHEMY,
        Professions.BLACKSMITHING,
        Professions.ENCHANTING,
        Professions.ENGINEERING,
        Professions.HERBALISM,
        Professions.JEWELCRAFTING,
        Professions.LEATHERWORKING,
        Professions.MINING,
        Professions.SKINNING,
        Professions.TAILORING,]);


    return <Dropdown isOpen={isOpen} toggle={toggleOpen} onClick={e => console.log(e)}>
        <DropdownToggle caret>
            {selectedProfession}
        </DropdownToggle>
        <DropdownMenu>
            {professions.current.map(p => {
                return <DropdownItem
                    key={p}
                    disabled={selectedProfession === p}
                    onClick={setActiveProfession(p)}
                >
                    {p}
                </DropdownItem>
            })}
        </DropdownMenu>
    </Dropdown>

}

export default ProfessionDropdown;