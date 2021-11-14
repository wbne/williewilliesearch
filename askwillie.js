const course_data = "./data/data.json"
let processed_data
let map = {}
const bubble = document.getElementById("willieadvice")

document.onload = init()

function init() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                processed_data = JSON.parse(httpRequest.responseText);

                for(var i = 0; i < processed_data.length; i++) {
                    map[processed_data[i].name] = i
                }

            }
        }
    };
    httpRequest.open('GET', course_data);
    httpRequest.send(); 
}
function process() {
    var rawInput = document.getElementById("qa")
    var input = rawInput.value
    var regexCourse = /^[a-zA-Z]{2,4}\d{4}$/
    var regexProf = /\d/
    if(regexCourse.test(input)) {
        console.log("matched course")
        getCourse(input)
    }
    else if(!regexProf.test(input)) {
        console.log("matched prof")
    }
    else {
        console.log("please try again")
        bubble.innerHTML = "<p>Please try entering the query again.</p><p>Remember that for courses you don't use spaces (eg. MATH2414)</p>"
    }
}

function getCourse(courseName) {
    var index = map[courseName]
    var grades = processed_data[index]
    bubble.innerHTML = "<p>The grade distribution for " + grades.name + " is:</p>"
    //console.log(grades)
    graphGrades(grades)
}

function test() {
    fetch("https://api.utdnebula.com/v1/sections/search?course_number=2020", {
    method: "GET",
        headers: {
            "Authorization" : "dd1h55UQUb8x5nQIPW2iJ1ABaIDx9iv7"
        }
    }
).then((resp) => {
    resp.json().then((json) => {
        console.log(json);
    });
});
}

function graphGrades(grades) {
    var localHeight = 600;
    var localWidth = 800;
    //console.log("here")
    data = []
    letters = {'A+': 0, 'A': 0, 'A-': 0, 'B+': 0, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0, 'C-': 0, 'D+': 0, 'D': 0, 'D-': 0, 'F': 0, 'W': 0}
    for (key in letters) {
        data.push({letter: key, count: grades[key]})
    }
    //console.log(data)
    
    d3.select("#willieadvice")
    svg = d3.select("#willieadvice")
    .append("svg")
      .classed("graph", true)
      .attr("width", localWidth + 50)
      .attr("height", localHeight + 100)
      .append("g")
        .attr("transform", "translate(" + 25 + "," + 50 + ")")
    var x = d3.scaleBand()
        .range([ 0, localWidth ])
        .domain(data.map(function(d) { return d.letter; }))
        .padding(0.2);
      svg.append("g")
        .attr("transform", "translate(0," + localHeight + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .style("text-anchor", "end");

      var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {return +d.count})])
        .range([ localHeight, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
        svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", 40)
          .attr("y", -5)
          .text(""+grades.name)

      svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.letter); })
          .attr("y", function(d) { return y(d.count); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return localHeight - y(d.count); })
          .attr("fill", function(d, i){return "rgba("+Math.round(255-(1020/(i+4)))+","+Math.round(1020/(i+4))+",0,1)";})
}