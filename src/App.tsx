import React, {useState} from 'react';
import Api from "./API/Api";
import ProfessionTable from "./components/ProfessionTable";
import {DbItemReagent, GetItemResponse} from "./types";
import {Col, Container, Row} from "reactstrap";
import FormatCost from "./components/FormatCost";

const App = () => {

    const [calculatedItems, setCalculatedItems] = useState<any[]>([]);
    const [activeRecipeName, setActiveRecipeName] = useState<string | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(false);

    // Todo: use recipeId instead of recipeName and maybe move some state to Redux
    const requestItem = (recipeName: string, reagents: DbItemReagent[]) => async () => {

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

    }

    return <Container className={`${isLoading ? "wait" : ""}`}>
        <Row>
            <Col xs={12} md={5}>
                <ProfessionTable
                    requestItemCallback={requestItem}
                    activeRecipeName={activeRecipeName}
                />
            </Col>
            <Col xs={12} md={7}>
                <FormatCost reagents={calculatedItems}/>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <span className={"font-sm"}>
                    Prices supplied by <a href={"https://nexushub.co"} target={"_blank"}>Nexushub</a>
                </span>
            </Col>
        </Row>
    </Container>
}

export default App;
