// from data.js
var tableData = data;

// YOUR CODE HERE!

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    
}

var tbody = d3.select("tbody")

function loadData(searchSTring,scol) {
    var xData = [];
    if (searchSTring.length > 0) {
        var xData = data.filter( el => {
            return el[scol].toUpperCase() === searchSTring;
        });
    } else {
        xdata = data;
    }
}

xData.forEach( (dataset) => {
    display = 1;
    if (display) {
        var row = tbody.append("tr");
        Object.entries(dataset).forEach(([key, value]) => {
            var cell = row.append("td");
            if (key ==="city" || key === "shape") {
                value = capitalize(value);
            }
            if (key === "state" || key === "country") {
                value = value.toUpperCase();
            }
            cell.text(value);
        });
    }
});


loadData("","");

var search = d3.select("#filter-btn");

search.on("click", function() {
    d3.event.preventDefault();
    var input = d3.select("#search");
    var search_selector = d3.select("#search_selector");
    var scol = search_selector.node().value;
    var sstring = input.node().value;

    if(scol === "datetime") {
        inputGood = true;
        split = sstring.split('/');
        console.log(split);
        inputGood &= (split.length === 3);
        var day = parseInt(split[0]);
        var month = parseInt(split[1]);
        var year = parseInt(split[2]);

        inputGood &= (month > 0 && month < 13);
        inputGood &= (day > 0 && day < 31);
        inputGood &= (year > 2000);
        if (!inputGood) {
            alert("Date format must be m/d/yyyy with yyyy > 2000. Valid date required!");
            return;      
}
    sstring = month.toString()+"/"+day.toString()+"/"+year.toString();
    }

    d3.select("tbody").selectAll("tr").remove();
    loadData(sstring,scol);

});
