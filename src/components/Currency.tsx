import React from "react";

type CurrencyProps = { amount?: number }

const Currency = ({amount = 0}: CurrencyProps) => {

    const gold = Math.floor(amount / 10000)
    const silver = Math.floor((amount / 100) - (gold * 100))
    const copper = (amount - gold * 10000) - (silver * 100)

    return <span>
        {gold > 0 && <span className={"currency currency-gold"}>{`${gold}`}</span>}
        {silver > 0 && <span className={"currency currency-silver"}>{`${silver}`}</span>}
        {copper > 0 && <span className={"currency currency-copper"}>{`${copper}`}</span>}
    </span>

}

export default Currency