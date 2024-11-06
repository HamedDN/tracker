class input {

    title;
    dropdown;

    constructor(title, dropdown)
    {
        this.title = title;
        this.dropdown = dropdown
    }

    Body()
    {
        return (
            $(`<div>`)
                .append(
                    $('<p>')
                        .text(this.title)
                )
                .append(
                    $('<div>')
                        .append(
                            !this.dropdown ?
                                $('<input>')
                            :
                                $('<select id="dropdown">')

                        )
                )
        )
    }

    Init()
    {
        for(let option in this.dropdown)
            $('.dropdown')
                .append(
                    $('<option>')
                        .text(option)
                )
            
    }
}

let main = $('#main')

let input2 = new input('title')

input2.Init();
main.append(
    input2.Body()
)