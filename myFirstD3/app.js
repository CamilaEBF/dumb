// setting up the graph
var vis = d3.select("div#graph").append("svg");

var w = 900, h = 600;
vis.attr("width", w)
   .attr("height", h);

var hscale = 2;
var vscale = h/100;

// setting up data nodes
var nodes = [
                     {startDate:new Date(2009,5,30)
                     ,endDate:new Date(2009,6,15)
                     ,dollaz:7.15
                     ,title:"Admin Assistant"
                     ,company:"G&E Insurance"
                     }
                    ,{startDate:new Date(2009,6,15)
                     ,endDate:new Date(2009,7,30)
                     ,dollaz:7.25
                     ,title:"Admin Assistant"
                     ,company:"G&E Insurance"
                     }
                    ,{startDate:new Date(2010,4,22)
                     ,endDate:new Date(2010,7,10)
                     ,dollaz:14.25
                     ,title:"QA staff"
                     ,company:"US Census Bureau"
                     }
                    ,{startDate:new Date(2011,3,1)
                     ,endDate:new Date(2011,4,28)
                     ,dollaz:10
                     ,title:"Math Teacher"
                     ,company:"Asian Prep School"
                     }
                    ,{startDate:new Date(2011,5,6)
                     ,endDate:new Date(2011,7,25)
                     ,dollaz:15
                     ,title:"Tech Intern"
                     ,company:"Linkshare Rakuten"
                     }
                    ,{startDate:new Date(2012,5,19)
                     ,endDate:new Date(2012,7,31)
                     ,dollaz:30
                     ,title:"R&D Intern"
                     ,company:"Bloomberg LP"
                     }
                    ,{startDate:new Date(2012,8,29)
                     ,endDate:new Date(2012,9,7)
                     ,dollaz:13
                     ,title:"Test Proctor"
                     ,company:"Advantage Testing"
                     }
                    ,{startDate:new Date(2013,2,4)
                     ,endDate:new Date(2013,6,27)
                     ,dollaz:30
                     ,title:"Junior Developer"
                     ,company:"Dressler LLC"
                     }
                    ,{startDate:new Date(2013,7,8)
                     ,endDate:new Date(2013,7,20)
                     ,dollaz:7.25
                     ,title:"Bike Delivery"
                     ,company:"Insomnia Cookies"
                     }
                    ,{startDate:new Date(2014,0,3)
                     ,endDate:new Date(2014,1,14)
                     ,dollaz:0
                     ,title:"App Dev Intern"
                     ,company:"PBS POV"
                     }
                    ,{startDate:new Date(2014,1,8)
                     ,endDate:new Date(2014,1,15)
                     ,dollaz:9
                     ,title:"Cashier"
                     ,company:"Whitecake Bakery"
                     }
                    ];

var beginningOfTime = new Date(2009,5,30);
var maxPay = 50;
function getDaysPassed(d) { return (d-beginningOfTime)/(24*60*60*1000);}

var snode = vis.selectAll("circle.node")
              .data(nodes)
              .enter().append("g")
              .attr("class","node")
    .text(function(d){ return d.title+" @ "+d.company; });

snode.append("svg:circle")
    .attr("pay", function(d) { return d.title; })
    .attr("cx", function(d) { return getDaysPassed(d.startDate)/hscale; })
    .attr("cy", function(d) { return (maxPay - d.dollaz)*vscale; })
    .attr("r", "3px")
    .attr("fill", "black");

var enode = vis.selectAll("circle.node")
               .data(nodes)
               .enter().append("g")
               .attr("class","node")
    .text(function(d){ return d.title+" @ "+d.company; });
enode.append("svg:circle")
    .attr("pay", function(d) { return d.title; })
    .attr("cx", function(d) { return getDaysPassed(d.endDate)/hscale; })
    .attr("cy", function(d) { return (maxPay - d.dollaz)*vscale; })
    .attr("r", "3px")
    .attr("fill", "black");

/*
vis.selectAll("circle.nodes")
   .data(nodes)
   .enter()
   .append("svg:circle")
   .attr("cx", function(d) { return d.x; })
   .attr("cy", function(d) { return d.y; });
*/
