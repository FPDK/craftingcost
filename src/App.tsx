import React, {useCallback, useState} from 'react';
import Api from "./API/Api";
import {DbItem, DbItemReagent, GetItemResponse, Professions} from "./types";
import {Col, Container, Input, Navbar, Row} from "reactstrap";
import ProfessionTable from "./components/ProfessionTable";
import ProfessionDropdown from "./components/ProfessionDropdown";
import itemDatabase from "./db/db";
import CostTable from "./components/CostTable";

const App = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [calculatedItems, setCalculatedItems] = useState<any[]>([]);
    const [activeRecipeName, setActiveRecipeName] = useState<string | undefined>(undefined);
    const [filterValue, setFilterValue] = useState<string>("");
    const [selectedProfession, setSelectedProfession] = useState<Professions | undefined>(Professions.ENCHANTING);
    const [filteredProfessions, setFilteredProfessions] = useState<DbItem[]>(itemDatabase[Professions.ENCHANTING]);


    // Todo: use recipeId instead of recipeName and maybe move some state to Redux
    const requestItem = useCallback((recipeName: string, reagents: DbItemReagent[]) => async () => {

        setActiveRecipeName(recipeName)

        setIsLoading(true)

        const promises: Promise<GetItemResponse>[] = reagents.map(reagent => Api.operations.getItem(reagent.id))

        Promise
            .all(promises)
            .then((response) => {

                setCalculatedItems(reagents.map(reagent => {

                    const price = response.find(r => r.itemId === reagent.id)?.stats?.current
                    const historicalMarketValue = price?.historicalValue ?? 0
                    const marketValue = price?.marketValue ?? 0
                    const marketQuantity = price?.numAuctions ?? 0
                    const expectedCost = Math.ceil(marketValue * reagent.quantity)

                    return {
                        ...reagent,
                        ...{
                            historicalMarketValue: historicalMarketValue,
                            marketValue: marketValue,
                            marketQuantity: marketQuantity,
                            expectedCost: expectedCost
                        }
                    }

                }))

            })
            .catch((error) => {
                alert(error.toString())
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])


    //
    const setActiveProfession = useCallback((profession: Professions) => () => {
        setSelectedProfession(profession)
        setFilteredProfessions(itemDatabase[profession])
        setFilterValue("")
    }, [])


    //
    const searchRecipeCallback = useCallback((event) => {
        const value = event.target.value

        setFilterValue(value)

        if (selectedProfession) {
            setFilteredProfessions(itemDatabase[selectedProfession]
                .filter(recipe => recipe.name.toLowerCase().includes(value.toLowerCase())
                ))
        }

    }, [selectedProfession])

    return <div className={` ${isLoading ? "wait" : ""}`}>

        <Navbar color="light" light expand="md">
            <Container>
                <Row className={"w-100"}>
                    <Col xs={12} className={"w- d-flex flex-row"}>
                        <ProfessionDropdown
                            className={"d-flex me-3"}
                            selectedProfession={selectedProfession}
                            setActiveProfession={setActiveProfession}
                        />
                        <Input
                            type={"text"}
                            value={filterValue}
                            className={"d-flex flex-grow-1"}
                            placeholder={"Search in active profession.."}
                            onChange={searchRecipeCallback}
                        />
                    </Col>
                </Row>
            </Container>
        </Navbar>

        <Container role="main" className={"mt-3"}>
            <Row>
                <Col xs={8} md={7} lg={5}>
                    <ProfessionTable
                        requestItemCallback={requestItem}
                        activeRecipeName={activeRecipeName}
                        filteredProfessions={filteredProfessions}
                    />
                </Col>
                <Col xs={4} md={5} lg={7}>
                    <CostTable reagents={calculatedItems}/>
                </Col>
            </Row>
        </Container>
    </div>
}

export default App;
