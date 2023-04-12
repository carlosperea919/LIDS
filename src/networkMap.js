// Make the DIV element draggable:
/*dragElement(document.getElementById("node"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}*/
const alertsMap = new Map()
alertsMap.set("Workspace1", [
  {
    "source": "10.0.0.3",
    "destination": "10.0.0.1",
    "reason": "Port Scan"
  },
  {
    "source": "10.0.0.3",
    "destination": "10.0.0.1",
    "reason": "Unexpected Communication"
  },
  {
    "source": "10.0.0.2",
    "destination": "10.0.0.1",
    "reason": "Unexpected Communication"
  },
  {
    "source": "12.5.1.2",
    "destination": "10.0.0.1",
    "reason": "Unexpected Communication"
  },
  {
    "source": "10.0.0.3",
    "destination": "10.0.0.1",
    "reason": "Failed Login Attempt"
  },
  {
    "source": "10.0.0.2",
    "destination": "10.0.0.1",
    "reason": "Failed Login Attempt"
  },
  {
    "source": "10.0.2.4",
    "destination": "10.0.0.1",
    "reason": "Unknown IP"
  }
])
alertsMap.set("Workspace2", [
  {
    "source": "10.0.0.3",
    "destination": "10.0.0.2",
    "reason": "Unexpected Communication"
  },
  {
    "source": "10.0.0.2",
    "destination": "10.0.0.2",
    "reason": "Unexpected Communication"
  },
  {
    "source": "12.5.1.2",
    "destination": "10.0.0.2",
    "reason": "Unexpected Communication"
  },
  {
    "source": "10.0.2.4",
    "destination": "10.0.0.2",
    "reason": "Unknown IP"
  }
])

alertsMap.set("Workspace3", [
  {
    "source": "10.0.2.4",
    "destination": "10.0.0.3",
    "reason": "Unknown IP"
  }
])

localStorage.setItem("Alerts", JSON.stringify([...alertsMap]))

var alertsModal = document.getElementById('alertsModal')
alertsModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var node = button.getAttribute('data-bs-node')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  var modalTitle = alertsModal.querySelector('.modal-title')
  var modalFooter = alertsModal.querySelector('.modal-footer')
  var modalBody = alertsModal.querySelector('.modal-body')
  var modalAccordion = document.getElementById("accordionAlerts")
  modalTitle.textContent = node + ' Alert Stats'
  modalFooter.innerHTML = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><a class="btn btn-primary" href="alertsList.html?' + node + '" role="button">View All Alerts</a>'
  modalAccordion.innerHTML = ""
  
  const portScanArray = []
  const failedLoginArray = []
  const unexCommArray = []
  const unknownIPArray = []

  if (alertsMap.has(node)) {
    const alertsForNode = alertsMap.get(node)
    for (let i = 0; i < alertsForNode.length; i++) {
      switch(alertsForNode[i].reason) {
        case "Port Scan":
          portScanArray.push(alertsForNode[i])
          break
        case "Failed Login Attempt":
          failedLoginArray.push(alertsForNode[i])
          break
        case "Unexpected Communication":
          unexCommArray.push(alertsForNode[i])
          break
        case "Unknown IP":
          unknownIPArray.push(alertsForNode[i])
          break
      }
    }
  }
  if (portScanArray.length > 0) {
    modalAccordion.innerHTML += getAlertStatsHTML("One", "Port Scan", "HIGH", portScanArray)
  }

  if (failedLoginArray.length > 0) {
    modalAccordion.innerHTML += getAlertStatsHTML("Two", "Failed Login Attempt", "MEDIUM", failedLoginArray)
  }

  if (unexCommArray.length > 0) {
    modalAccordion.innerHTML += getAlertStatsHTML("Three", "Unexpected Communication", "MEDIUM", unexCommArray)
  }

  if (unknownIPArray.length > 0) {
    modalAccordion.innerHTML += getAlertStatsHTML("Four", "Unknown IP", "LOW", unknownIPArray)
  }
})

function renderAlertsForSystem(system) {
  
}
function getAlertStatsHTML(id, reason, severity, alertsList) {
  let color = "secondary"
  if (severity == "HIGH") {
    color = "danger"
  } else if (severity == "MEDIUM") {
    color = "warning"
  } else if (severity == "LOW") {
    color = "secondary"
  }
  let AlertStatsHTML = 
  '<div class="accordion-item">\
    <h2 class="accordion-header" id="heading'+id+'">\
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+id+'" aria-expanded="false" aria-controls="collapse'+id+'">\
          <span class="badge bg-' + color + ' me-2">' + alertsList.length + '</span>' + reason + '\
      </button>\
    </h2>\
    <div id="collapse'+id+'" class="accordion-collapse collapse" aria-labelledby="heading'+id+'" data-bs-parent="#accordionAlerts">\
      <div class="accordion-body">\
        <table class="table table-striped">\
          <thead class="table-dark">\
            <tr>\
              <th scope="col">#</th>\
              <th scope="col">Source</th>\
              <th scope="col">Destination</th>\
              <th scope="col">Reason</th>\
              <th scope="col">Severity</th>\
            </tr>\
          </thead>\
          <tbody>'
  for (let i = 0; i < alertsList.length; i++) {
    AlertStatsHTML +=
      '<tr class="table-' + color + '">\
      <th scope="row">' + (i+1) + '</th>\
      <td>' + alertsList[i].source + '</td>\
      <td>' + alertsList[i].destination + '</td>\
      <td>' + reason + '</td>\
      <td>' + severity + '</td>'
  }
  AlertStatsHTML +=
            '</tr>\
          </tbody>\
        </table>\
      </div>\
    </div>\
  </div>'

  return AlertStatsHTML;
}