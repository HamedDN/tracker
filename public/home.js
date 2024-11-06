document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const data = document.getElementById('data').value;
    const newItem = { id: Date.now(), name, data };

    try {
        const response = await fetch('/api/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });
        
        if (response.ok) {
            alert('Item added successfully!');
            document.getElementById('itemForm').reset();
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
});