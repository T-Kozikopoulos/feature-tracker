// Selectors
const featureInput = document.getElementById('feature-input');
const featureButton = document.getElementById('feature-button');
const featureList = document.querySelector('.feature-list');
const filterOption = document.querySelector('.filter-features');

// Event Listeners
document.addEventListener('DOMContentLoaded', getFeatures);
featureButton.addEventListener("click", addFeature);
featureList.addEventListener('click', deleteFeature);
filterOption.addEventListener('click', filterFeature);

// Functions
// Add a new task to the list
function addFeature(event) {
	// Stop form from submitting.
	event.preventDefault();

	// Creating the layout for each new feature.
	var featureDiv = document.createElement('div');
	featureDiv.classList.add('feature');

	var newFeature = document.createElement('li');
	newFeature.innerText = featureInput.value;
	newFeature.classList.add('feature-item');
	featureDiv.appendChild(newFeature);

	// Save feature to cookies
	saveFeaturesInCookies(featureInput.value);

	// Adding the two buttons
	var completeButton = document.createElement('button');
	completeButton.innerHTML = '<i class="fas fa-check"></i>';
	completeButton.classList.add("complete-btn");
	featureDiv.appendChild(completeButton);

	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add("delete-btn");
	featureDiv.appendChild(deleteButton);

	// Adding the div to the list
	featureList.appendChild(featureDiv);
	// Clear the form
	featureInput.value = '';
}

// Remove a feature from the list
function deleteFeature(event) {
	const item = event.target;
	if (item.classList[0] === 'delete-btn') {
		const feature = item.parentElement;
		// Delete animation
		feature.classList.add("fall");
		removeLocalFeatures(feature)
		feature.addEventListener('transitionend', function() {
			feature.remove();
		})
	}
	// Mark feature as finished
	if (item.classList[0] === "complete-btn") {
		const feature = item.parentElement;
		feature.classList.toggle("complete");
	}
}

// Add filtering based on feature progress
function filterFeature(event) {
	const features = featureList.childNodes;
	features.forEach( (feature) => {
		switch(event.target.value) {
			case "all":
				feature.style.display = "flex";
				break;
			case "complete":
				if (feature.classList.contains("complete")) {
					feature.style.display = "flex";
				} else {
					feature.style.display = "none";
				}
				break;
				case "incomplete":
					if (!feature.classList.contains("complete")) {
						feature.style.display = "flex";
					} else {
						feature.style.display = "none";
					}
			}
		}
	)
}

// Add all features in the cookies
function saveFeaturesInCookies(feature) {
	// Check for already existing features in local storage
	let features;
	if (localStorage.getItem('features') === null) {
		features = [];
	} else {
		features = JSON.parse(localStorage.getItem('features'));
	}
	features.push(feature);
	localStorage.setItem('features', JSON.stringify(features));
}

// Grab the features from local storage so we can display them
function getFeatures() {
	// Check for already existing features in local storage
	let features;
	if (localStorage.getItem('features') === null) {
		features = [];
	} else {
		features = JSON.parse(localStorage.getItem('features'));
	}
	features.forEach((feature) => {
		var featureDiv = document.createElement('div');
		featureDiv.classList.add('feature');

		var newFeature = document.createElement('li');
		newFeature.innerText = feature;
		newFeature.classList.add('feature-item');
		featureDiv.appendChild(newFeature);

		// Adding the two buttons
		var completeButton = document.createElement('button');
		completeButton.innerHTML = '<i class="fas fa-check"></i>';
		completeButton.classList.add("complete-btn");
		featureDiv.appendChild(completeButton);

		var deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
		deleteButton.classList.add("delete-btn");
		featureDiv.appendChild(deleteButton);

		// Adding the div to the list
		featureList.appendChild(featureDiv);
	})
}

// Delete features from cookies
function removeLocalFeatures(feature) {
  let features;
  if (localStorage.getItem("features") === null) {
    features = [];
  } else {
    features = JSON.parse(localStorage.getItem("features"));
  }
  // Find the index of the feature you want removed
  const featureIndex = feature.children[0].innerText;
  // Remove the feature
  features.splice(features.indexOf(featureIndex), 1);
  // Set features to the new list in which  the item was removed
  localStorage.setItem("features", JSON.stringify(features));
}
