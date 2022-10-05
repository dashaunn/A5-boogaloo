window.addEventListener("load", function() {

    // 'Fetching Planetary Data' goes below:
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        response.json().then(function(json) {

            let missionTarget = document.getElementById("missionTarget");
            missionTarget.innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[2].name}</li>
               <li>Diameter: ${json[2].diameter}</li>
               <li>Star: ${json[2].star}</li>
               <li>Distance from Earth: ${json[2].distance}</li>
               <li>Number of Moons: ${json[2].moons}</li>
            </ol>
            <img src="${json[2].image}">`
        
        });
    });

    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let copilotNameInput = document.querySelector("input[name=copilotName]");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let cargoMassInput = document.querySelector("input[name=cargoMass]");

        let shuttleRequirements = document.getElementById("faultyItems");
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");
        let launchStatusHeader = document.getElementById("launchStatus");

        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;

        if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
            alert("All fields are required");
            event.preventDefault();

        } else if (cargoMassInput.value > 10000 && fuelLevelInput.value < 10000) { //mass fail, fuel fail
            event.preventDefault();
            shuttleRequirements.style.visibility = "visible";
            launchStatusHeader.style.color = "red";
            launchStatusHeader.innerHTML = "Shuttle Not Ready For Launch";
            cargoStatus.innerHTML = "Cargo mass is too high for launch";
            fuelStatus.innerHTML = "Not enough fuel for lauch";

        } else if (cargoMassInput.value < 10000 && fuelLevelInput.value < 10000) { //mass pass, fuel fail
            event.preventDefault();
            shuttleRequirements.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass low enough for launch"
            fuelStatus.innerHTML = "Not enough fuel for lauch";
            launchStatusHeader.style.color = "red";
            launchStatusHeader.innerHTML = "Shuttle Not Ready For Launch";

        } else if (cargoMassInput.value > 10000 && fuelLevelInput.value > 10000) { //mass fail, fuel pass
            event.preventDefault();
            shuttleRequirements.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass is too high for launch";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            launchStatusHeader.style.color = "red";
            launchStatusHeader.innerHTML = "Shuttle Not Ready For Launch";
        
        } else if (fuelLevelInput.value < 10000) { //fuel fail
            event.preventDefault();
            shuttleRequirements.style.visibility = "visible";
            fuelStatus.innerHTML = "Not enough fuel for lauch";
            launchStatusHeader.style.color = "red";
            launchStatusHeader.innerHTML = "Shuttle Not Ready For Launch";

        } else if (cargoMassInput.value > 10000) { //mass fail
            event.preventDefault();
            shuttleRequirements.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass is too high for launch";
            launchStatusHeader.style.color = "red";
            launchStatusHeader.innerHTML = "Shuttle Not Ready For Launch";

        } else if (cargoMassInput.value > 10000 && fuelLevelInput.value < 10000) { //mass fail, fuel fail
            event.preventDefault();
            shuttleRequirements.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass is too high for launch";
            fuelStatus.innerHTML = "Not enough fuel for lauch";
            launchStatusHeader.style.color = "red";
            launchStatusHeader.innerHTML = "Shuttle Not Ready For Launch";

        } else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value) || !isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) { //if invalid input type is submitted
            event.preventDefault();
            alert("Make sure to enter valid information for each field!");

        } else { //all clear
            event.preventDefault()
            shuttleRequirements.style.visibility = "hidden"
            launchStatusHeader.style.color = "green";
            launchStatusHeader.innerHTML = "Shuttle Is Ready For Launch";
        };
    });


});
