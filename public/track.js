$('#search').on(
    'click',
    async () =>
    {
        const itemNumber = document.getElementById('itemNumber').value.trim();
        const errorMessage = document.getElementById('errorMessage');
        const resultTable = document.getElementById('resultTable');
        const tableBody = resultTable.querySelector('tbody');
    
        errorMessage.textContent = '';
        tableBody.innerHTML = '';
    
        if(!itemNumber)
        {
            errorMessage.textContent = 'Please enter a valid item number.';
            resultTable.style.display = 'none';
            return;
        }

        try
        {
            const response =
                await fetch(
                    '/api/items',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ number: itemNumber }),
                    }
                )
            ;

            const items = await response.json();

            if(items.length === 0) 
            {
                errorMessage.textContent = 'No items found with that number.';
                resultTable.style.display = 'none';
            }
            else
            {
                resultTable.style.display = 'block';
                items.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.number}</td>
                        <td>${item.subject}</td>
                        <td>${item.role}</td>
                        <td>${item.date}</td>
                        <td>${item.status}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
        catch (error)
        {
            errorMessage.textContent = 'Failed to fetch data. Please try again later.';
            console.error('Error fetching item:', error);
            resultTable.style.display = 'none';
        }
    }
);