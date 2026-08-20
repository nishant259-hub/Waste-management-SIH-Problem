const area = document.getElementById("area");
const street = document.getElementById("street");
const result = document.getElementById("result");

const streets = {
    frist_floor: ["ward 1", "ward 2", "ward 3", "ward 4"],
    second_floor: ["ward 1", "ward 2", "ward 3", "ward 4"],
    third_floor: ["ward 1", "ward 2", "ward 3", "ward 4"],
    fourth_floor: ["ward 1", "ward 2", "ward 3", "ward 4"],
};

area.addEventListener("change", function () {
    street.innerHTML = "<option value=''>-- Choose Street --</option>";

    if (!this.value) {
        street.disabled = true;
        result.innerHTML = `<div class="empty-state"><p>Select a floor and a street to view houses.</p></div>`;
        return;
    }

    street.disabled = false;

    streets[this.value].forEach(function (ward) {
        const option = document.createElement("option");
        option.value = ward;
        option.textContent = ward;
        street.appendChild(option);
    });

    result.innerHTML = `<div class="empty-state"><p>Now, select a street to view its houses.</p></div>`;
});

async function renderHouses() {
    const selectedFloor = area.value;
    const selectedWard = street.value;

    if (!selectedWard) {
        result.innerHTML = `<div class="empty-state"><p>Select a street to view its houses.</p></div>`;
        return;
    }

    const respose = await fetch(`/api/houses/${selectedFloor}/${selectedWard}`);
    const houses = await respose.json();

    let html = `
        <h2 class="results-title">Houses in ${selectedWard}</h2>
        <div class="houses-grid">
    `;

    houses.forEach(function (house) {
        let statusClass = "";
        if (house.status === "Need cleaning") {
            statusClass = "needs-cleaning";
        } else if (house.status === "Clean") {
            statusClass = "clean";
        } else if (house.status === "Pending at Hub") {
            statusClass = "pending-hub";
        } else if (house.status === "Recycled") {
            statusClass = "recycled";
        } else if (house.status === "Unavailable") {
            statusClass = "unavailable";
        }

        html += `
            <div class="house" onclick="openCleaningForm('${house._id}', '${house.status}')">
                <h3>${house.house}</h3>
                <span class="badge ${statusClass}">${house.status}</span>
            </div>`;
    });

    html += `</div>`;
    result.innerHTML = html;
}

street.addEventListener("change", renderHouses);

let selectedHouseId = null;

function openCleaningForm(houseId, status) {
    if (status !== "Need cleaning") {
        alert("This house is already processed today!");
        return;
    }

    selectedHouseId = houseId;

    const overlay = document.getElementById("cleaningFormOverlay");
    const selectedHouse = document.getElementById("selectedHouse");
    const formMessage = document.getElementById("formMessage");

    document.getElementById("verificationCode").value = "";
    document.getElementById("segregation").checked = false;
    formMessage.textContent = "";
    formMessage.className = "";

    overlay.style.display = "flex";
    selectedHouse.textContent = `Selected House: ${houseId}`;
}

const submitCleaning = document.getElementById("submitCleaning");

submitCleaning.addEventListener("click", async function () {
    const code = document.getElementById("verificationCode").value;
    const segregation = document.getElementById("segregation").checked;
    const formMessage = document.getElementById("formMessage");

    try {
        const response = await fetch("api/verify-house", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                houseId: selectedHouseId,
                enteredCode: code,
                isSegregated: segregation
            })
        });

        const result = await response.json();
        if (result.success) {
            formMessage.textContent = "✅" + result.message;
            formMessage.className = "msg-success";

            renderHouses();

            setTimeout(() => {
                document.getElementById("cleaningFormOverlay").style.display = "none";
            }, 2000);

        } else {
            formMessage.testContent = "❌" + result.message;
            formMessage.className = "msg-error";
        }
    } catch (error) {
        console.log(error);
        formMessage.testContent = "❌ An error occured while verifyng house.";
        formMessage.className = "msg-error";
    }
});


const closeForm = document.getElementById("closeForm");
closeForm.addEventListener("click", function () {
    document.getElementById("cleaningFormOverlay").style.display = "none";
});

const markAsUnavailable = document.getElementById("unavailable");

markAsUnavailable.addEventListener("click", async function () {
    try {
        const response = await fetch("/api/mark-unavailable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                houseId: selectedHouseId
            })

        });

        const result = await response.json();

        if (result.success) {
            formMessage.textContent = "⚠️ " + result.message;
            formMessage.className = "msg-success";
            renderHouses();

            setTimeout(() => {
                document.getElementById("cleaningFormOverlay").style.display = "none";
            }, 2000);

        } else {
            formMessage.testContent = "❌" + result.message;
            formMessage.className = "msg-error";
        }
    } catch (error) {
        console.log(error);
        formMessage.testContent = "❌ An error occured while markig house as unavailable.";
        formMessage.className = "msg-error";
    }
});

const endTrip = document.getElementById("endTrip");
endTrip.addEventListener("click", async function () {
    try {
        const response = await fetch("/api/end-trip", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }

        });

        const result = await response.json();
        if (result.success) {
            alert("✅ " + result.message + "\n\nBatch ID: " + result.batchId);

            location.reload();
        } else {
            alert("❌ Error: " + result.message);
        }
    } catch (error) {
        console.log("End trip error: ", error);
        alert("❌ Kuch galat ho gaya, phir se try karein.");
    }
});

const verifyHub = document.getElementById("verifyHubBtn");

verifyHub.addEventListener("click", async function () {
    const enterCode = prompt("Enter the 4-digit, you get this code from valid registered recyclebin Hub");

    if (enterCode) {
        const verifyResponse = await fetch("/api/verify-batch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: enterCode
            })
        });

        const verifyResult = await verifyResponse.json();
        if (verifyResult.success) {
            alert("Verification Successfull");
            location.reload();
        } else {
            alert("verification failed, please enter the correct code  ");
        }
    }
});



const assignedWardValue = document.getElementById("assignedWard").value;
if (assignedWardValue) {
    area.dispatchEvent(new Event("change"));
}