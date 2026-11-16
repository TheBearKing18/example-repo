// Grocery items to display in the shopping list.
const groceryItems = ["Milk","Bread","Apples","Eggs"];

// Create a list element for each grocery item.
function displayItems() {
	const itemList = document.getElementById("itemList");
	itemList.innerHTML = "";

	groceryItems.forEach((item) => {
		const listItem = document.createElement("li");
		listItem.appendChild(document.createTextNode(item));

		const closeButton = document.createElement("span");
		closeButton.className = "close";
		closeButton.textContent = "\u00D7";
		listItem.appendChild(closeButton);

		itemList.appendChild(listItem);
	});

	deleteItems();
}

// Mark the first two grocery items as already bought.
function setDefaultChecked() {
	const listItems = document.querySelectorAll("#itemList li");

	listItems[0].classList.add("checked");
	listItems[1].classList.add("checked");
}

// Add a non-empty item from the input to the shopping list.
function addItems() {
	const input = document.getElementById("input");
	const item = input.value.trim();

	if (item === "") {
		alert("Please enter an item.");
		return;
	}

	groceryItems.push(item);
	input.value = "";
	displayItems();
}

// Add click listeners to each item's delete button.
function deleteItems() {
	const closeButtons = document.querySelectorAll("#itemList .close");

	closeButtons.forEach((closeButton) => {
		closeButton.addEventListener("click", (event) => {
			const listItem = event.target.parentElement;
			const itemIndex = Array.from(listItem.parentElement.children).indexOf(listItem);

			groceryItems.splice(itemIndex, 1);
			displayItems();
		});
	});
}

// Toggle the checked style when a shopping-list item is clicked.
function toggleItems(event) {
	if (event.target.tagName === "LI") {
		event.target.classList.toggle("checked");
	}
}

// Listen for clicks on list items and the Enter key in the input field.
document.getElementById("itemList").addEventListener("click", toggleItems);
document.getElementById("input").addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		document.getElementById("addButton").click();
	}
});

displayItems();
setDefaultChecked();