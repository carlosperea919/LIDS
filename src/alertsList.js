const node = location.search.substring(1)
const title = document.getElementById("title")
title.innerHTML = node + " Alerts"
const alertsTableBody = document.getElementById("alertsTableBody")

const alertsMap = localStorage.getItem("Alerts")
if (alertsMap != null) {
    const alertsMapParsed = new Map(JSON.parse(alertsMap))
    let index = {
        i: 1
    }
    if (node == "All") {
        if (alertsMapParsed.size > 0) {
            console.log("TEST")
            for (const value of alertsMapParsed.values()) {
                addAlertToTable(index, value)
            }
        }
    } else {
        if (alertsMapParsed.has(node)) {
            addAlertToTable(index, alertsMapParsed.get(node))
        }
    }
}

function addAlertToTable(index, alerts) {
    for (let i = 0; i < alerts.length; i++) {
        let severity = "LOW"
        switch(alerts[i].reason) {
            case "Port Scan":
                severity = "HIGH"
                break
            case "Failed Login Attempt":
                severity = "HIGH"
                break
            case "Unexpected Communication":
                severity = "MEDIUM"
                break
            case "Unknown IP":
                severity = "LOW"
                break
        }
        let color = "secondary"
        if (severity == "HIGH") {
            color = "danger"
        } else if (severity == "MEDIUM") {
            color = "warning"
        } else if (severity == "LOW") {
            color = "secondary"
        }
        alertsTableBody.innerHTML +=
        '<tr class="table-' + color + '">\
            <th scope="row">' + (index.i) + '</th>\
            <td>' + alerts[i].source + '</td>\
            <td>' + alerts[i].destination + '</td>\
            <td>' + alerts[i].reason + '</td>\
            <td>' + severity + '</td>\
        </tr>'
        index.i++
    }
}