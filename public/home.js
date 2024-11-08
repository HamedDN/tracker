$('#submit').on(
    'click',
    async function(e)
    {
        const
            name = $('#name'),
            data = $('#data')
        ;

        const newItem = {
            id: Math.floor(Math.random()),
            name : name.val(),
            data : data.val()
        };

        try
        {
            const response = await fetch(
                '/api/add-item',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                }
            );

            if (response.ok)
            {
                alert('Item added successfully!');
                name.val('');
                data.val('');
            }
        }
        catch (error)
        {
            console.error('Error adding item:', error);
        }
});