const inputs = document.querySelectorAll('input, textarea');
const progressBar = document.getElementById('progressBar');
const ratingText = document.getElementById('ratingText');
const modal = document.getElementById('modal');
const form = document.getElementById('feedbackForm');

const ratingLabels = [
    "Very Poor",
    "Poor",
    "Average",
    "Good",
    "Excellent"
];

// Progress calculation
function updateProgress() {
    let filled = 0;
    inputs.forEach(i => {
        if ((i.type === "radio" && i.checked) || i.value.trim()) filled++;
    });
    progressBar.style.width = (filled / inputs.length) * 100 + "%";
}

inputs.forEach(i => {
    i.addEventListener("input", updateProgress);
    i.addEventListener("change", updateProgress);
});

// Rating text
document.querySelectorAll('input[name="rating"]').forEach((r, i) => {
    r.addEventListener("change", () => {
        ratingText.textContent = ratingLabels[i];
    });
});

// Character counter
document.querySelectorAll("textarea").forEach(area => {
    const counter = area.nextElementSibling;
    const max = counter.dataset.max;

    area.addEventListener("input", () => {
        area.value = area.value.slice(0, max);
        counter.textContent = `${area.value.length} / ${max}`;
    });
});

// Submit
form.addEventListener("submit", e => {
    e.preventDefault();
    modal.style.display = "flex";
    form.reset();
    progressBar.style.width = "0%";
    ratingText.textContent = "Select a rating";
});

function closeModal() {
    modal.style.display = "none";
}
