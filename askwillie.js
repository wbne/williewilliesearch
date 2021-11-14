const course_data = "./data/data.json"
let processed_data
let map = {}
const bubble = document.getElementById("willieadvice")
const quotes = [
    "I did not ban Adresident235",
    "Fine, I'll do ECS Advising myself",
    "Project Nebula is an initiative by ACM Development, a group in the UT Dallas chapter of the Association for Computing Machinery.",
    "I really enjoy answering the same question for the 100th time today.",
    "This will make a fine addition to my vlog.",
    "Any quote can seem legitimate with accredidation",
    "Darn it, where's :thanowillie:",
    "Congratulations, you've ascended to my level... except I ...[used]... purely using manual queries",
    "Great, now you have incurred my wrath of regulatory oversight",
    "This is a sadge moment",
    "I have sniped a private study room on the second floor of ECSW, and I do not intend on leaving today 🙃"
]

window.onload = init()

function init() {
    var quote = document.getElementById("quote")
    var val = Math.round(Math.random() * 100)
    quote.innerHTML = quotes[val % quotes.length] + " - Willie Chalmers"

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
        try{
            getCourse(input)
        }
        catch(exception) {
            bubble.innerHTML = "<p>Please try entering the query again.</p><p>Remember that for courses you don't use spaces (eg. MATH2414)</p>"
        }
        
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

    graphGrades(grades)
}

function graphGrades(grades) {
    var localHeight = 600;
    var localWidth = 800;

    data = []
    letters = {'A+': 0, 'A': 0, 'A-': 0, 'B+': 0, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0, 'C-': 0, 'D+': 0, 'D': 0, 'D-': 0, 'F': 0, 'W': 0}
    for (key in letters) {
        data.push({letter: key, count: grades[key]})
    }

    
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