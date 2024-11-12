$('#search').on(
    'click',
    async () =>
    {
        const itemNumber = document.getElementById('itemNumber').value.trim();
        const errorMessage = document.getElementById('errorMessage');
        const resultMessage = document.getElementById('resultMessage');

        errorMessage.textContent = '';
        resultMessage.style.display = 'none';
        resultMessage.textContent = '';

        if(!itemNumber)
        {
            errorMessage.textContent = 'Please enter a valid item number.';
            return;
        }

        try 
        {
            const response = await fetch(
                '/api/items',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ number: itemNumber }),
                }
            );

            const items = await response.json();

            if(items.length === 0)
                errorMessage.textContent = 'No items found with that number.';
            else
            {
                const item = items[0];
                resultMessage.textContent = `شماره ${item.number} درخواست شما با موضوع (${item.topic}) توسط ${item.role} در تاریخ ${item.date} در وضعیت (${item.status}) است.`;
                resultMessage.style.display = 'block';
            }
        }
        catch (error)
        {
            errorMessage.textContent = 'Failed to fetch data. Please try again later.';
            console.error('Error fetching item:', error);
        }
    }
);