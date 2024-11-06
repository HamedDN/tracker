async function fetchItems() {
    try {
        const response = await fetch('/api/items');
        const items = await response.json();

        const itemsContainer = document.getElementById('items');
        itemsContainer.innerHTML = '';

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<strong>ID:</strong> ${item.id}, <strong>Name:</strong> ${item.name}, <strong>Data:</strong> ${item.data}`;
            itemsContainer.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchItems);