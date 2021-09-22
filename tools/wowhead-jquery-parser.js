/* eslint-disable no-undef */

/*
* 1) Go to list (https://tbc.wowhead.com/spells/professions/enchanting)
* 2) Run script in console (optional: Set "slotType" param if the table is filtered by applied slot)
* 3) Copy output array to external file
* 4) Repeat 1-3 for all pages
*/

function outputTable(slotType = null) {
    var items = []

    $("table.listview-mode-default tbody tr").each((index, row) => {

        const cells = $(row).find('td')
        const reagentWrap = $(cells[2])

        const reagents = []

        $(reagentWrap).find('.iconmedium').each((index, item) => {

            const href = $(item).find('a').attr('href')
            const hrefParts = href.split("/")

            const id = parseInt(hrefParts[1].replaceAll('item=', ''))

            const name = hrefParts[2]
                .replaceAll('item=', '')
                .replaceAll('-', ' ').split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

            const quantity = parseInt($(item).find('span').find('span').text())

            const img = $(item).find('ins').attr('style')
                .replaceAll('background-image: url("', '')
                .replaceAll('");', '')

            reagents.push({
                id: id,
                href: href,
                name: name,
                quantity: Number.isNaN(quantity) ? 1 : quantity,
                img: img,
            })

        })

        const name = $(cells[1]).text()

        items.push({
            name: name,
            type: slotType,
            reagents: reagents
        })

    })

    console.log(items)
}



